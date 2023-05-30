import React, { createContext, useReducer, useContext, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  child,
  get,
  set,
  remove,
  update,
} from "firebase/database";
import {
  ref as refData,
  getDownloadURL,
  getStorage,
  uploadBytesResumable,
} from "firebase/storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDmbm3xl1Pv4aFszw3lHl4Yt1Q26Tg1d4M",
  authDomain: "photography-d8b9c.firebaseapp.com",
  databaseURL: "https://photography-d8b9c-default-rtdb.firebaseio.com",
  projectId: "photography-d8b9c",
  storageBucket: "photography-d8b9c.appspot.com",
  messagingSenderId: "884601979242",
  appId: "1:884601979242:web:15c6d0565ed1fdc918a513",
  measurementId: "G-RD2SL5GR9Q",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const dbRef = getDatabase(app);
const dbRefFetch = ref(getDatabase(app));
const storage = getStorage(app);

export interface User {
  id: string;
  name: string;
  email: string;
  location?: {
    latitude: number;
    longitude: number;
  };
  servicePrice?: number;
  // Add additional properties as needed
}

export interface Post {
  id: string;
  dateUpdated: string;
  dimension: {
    height: number;
    width: number;
  };
  userId: string;
  userName: string;
  image: string;
  postMessage: string;
  likes: Record<string, boolean>;
  comments: Record<string, Comment>;
}

interface Comment {
  commentId: string;
  userId: string;
  text: string;
  datePosted: string;
}

interface Feedback {
  id: string;
  datePosted: string;
  userId: string;
  text: string;
}

interface State {
  users: Record<string, User>;
  posts: Record<string, Post>;
  feedbacks: Record<string, Feedback>;
  selectedPost: Post | null;
}

type Action =
  | { type: "SET_USERS"; payload: Record<string, User> }
  | { type: "SET_POSTS"; payload: Record<string, Post> }
  | { type: "SET_FEEDBACKS"; payload: Record<string, Feedback> }
  | { type: "SELECT_POST"; payload: Post | null };

const initialState: State = {
  users: {},
  posts: {},
  feedbacks: {},
  selectedPost: null,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_USERS":
      return { ...state, users: action.payload };
    case "SET_POSTS":
      return { ...state, posts: action.payload };
    case "SET_FEEDBACKS":
      return { ...state, feedbacks: action.payload };
    case "SELECT_POST":
      return { ...state, selectedPost: action.payload };
    default:
      return state;
  }
}

// Upload image function
export const uploadImage = async (
  image: File,
  onProgress: (progress: number) => void
) => {
  // Create a reference in the storage with the image name
  const storageRef = refData(storage, `images/${image.name}`);
  const uploadTask = uploadBytesResumable(storageRef, image);

  return new Promise<{ url: string; name: string }>((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        onProgress(progress);
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        console.error(error);
        reject(error);
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          // Resolve with an object that includes both the URL and the name
          resolve({ url: downloadURL, name: image.name });
        });
      }
    );
  });
};

export const AppStateContext = createContext<
  [
    State,
    React.Dispatch<Action>,
    {
      createData: (
        path: "users" | "posts" | "feedbacks",
        id: string,
        userId: string,
        data: User | Post | Feedback
      ) => void;
      updateData: (
        path: "users" | "posts" | "feedbacks",
        id: string,
        userId: string,
        data: Partial<User | Post | Feedback>
      ) => void;
      deleteData: (
        path: "users" | "posts" | "feedbacks",
        id: string,
        userId: string
      ) => void;
      fetchData: (
        path: string,
        actionType: "SET_USERS" | "SET_POSTS" | "SET_FEEDBACKS"
      ) => void;
      selectPost: (post: Post | null) => void;
    }
  ]
>([
  initialState,
  () => null,
  {
    createData: () => {},
    updateData: () => {},
    deleteData: () => {},
    fetchData: () => {},
    selectPost: () => {},
  },
]);

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetchData("users", "SET_USERS");
    fetchData("posts", "SET_POSTS"); // Fetch posts data when the component mounts
  }, []);

  const selectPost = (post: Post | null) => {
    dispatch({ type: "SELECT_POST", payload: post });
  };

  // Fetch function
  const fetchData = (
    path: string,
    actionType: "SET_USERS" | "SET_POSTS" | "SET_FEEDBACKS"
  ) => {
    get(child(dbRefFetch, path))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          dispatch({ type: actionType, payload: data });
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Create function
  const createData = (
    path: "users" | "posts" | "feedbacks",
    id: string,
    userId: string,
    data: User | Post | Feedback
  ) => {
    const newPath =
      path === "posts" ? `${path}/${userId}-${id}` : `${path}/${id}`;

    set(ref(dbRef, newPath), data)
      .then(() => {
        fetchData(
          path,
          `SET_${path.toUpperCase()}` as
            | "SET_USERS"
            | "SET_POSTS"
            | "SET_FEEDBACKS"
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Update function
  const updateData = (
    path: "users" | "posts" | "feedbacks",
    id: string,
    userId: string,
    data: Partial<User | Post | Feedback>
  ) => {
    update(ref(dbRef, `${path}/${userId}-${id}`), data)
      .then(() => {
        fetchData(
          path,
          `SET_${path.toUpperCase()}` as
            | "SET_USERS"
            | "SET_POSTS"
            | "SET_FEEDBACKS"
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Delete function
  const deleteData = (
    path: "users" | "posts" | "feedbacks",
    id: string,
    userId: string
  ) => {
    remove(ref(dbRef, `${path}/${userId}-${id}`))
      .then(() => {
        fetchData(
          path,
          `SET_${path.toUpperCase()}` as
            | "SET_USERS"
            | "SET_POSTS"
            | "SET_FEEDBACKS"
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <AppStateContext.Provider
      value={[
        state,
        dispatch,
        {
          createData,
          updateData,
          deleteData,
          fetchData,
          selectPost,
        },
      ]}
    >
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  return useContext(AppStateContext);
}

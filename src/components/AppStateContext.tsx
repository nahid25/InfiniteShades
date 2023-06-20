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
  push,
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

// Get a reference to the database
const dbRef = getDatabase(app);
const dbRefFetch = ref(getDatabase(app));

// Get a reference to the storage
const storage = getStorage(app);

// Defined interfaces for database i.e user, post, comment and feedback etc.
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
  postId: string;
  currentUserId: string;
  replies?: Record<string, Comment>; // Added this line
}

interface CommentRecord {
  [key: string]: Comment;
}

interface Reply {
  commentId: string;
  userId: string;
  text: string;
  datePosted: string;
  postId: string;
  currentUserId: string;
}

interface Feedback {
  id: string;
  datePosted: string;
  userId: string;
  text: string;
}

// Define the state interface and the action types
interface State {
  users: Record<string, User>;
  posts: Record<string, Post>;
  comments: CommentRecord;
  feedbacks: Record<string, Feedback>;
}

type Action =
  | { type: "SET_USERS"; payload: Record<string, User> }
  | { type: "SET_POSTS"; payload: Record<string, Post> }
  | { type: "SET_COMMENTS"; payload: CommentRecord }
  | {
      type: "SET_REPLIES";
      payload: { commentId: string; replies: CommentRecord };
    }
  | { type: "SET_FEEDBACKS"; payload: Record<string, Feedback> };

// The initial state of the application
const initialState: State = {
  users: {},
  posts: {},
  comments: {},
  feedbacks: {},
};

// The reducer function
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_USERS":
      return { ...state, users: action.payload };
    case "SET_POSTS":
      return { ...state, posts: action.payload };
    case "SET_COMMENTS":
      return { ...state, comments: { ...state.comments, ...action.payload } };
    case "SET_REPLIES": {
      const { commentId, replies } = action.payload;
      return {
        ...state,
        comments: {
          ...state.comments,
          [commentId]: {
            ...state.comments[commentId],
            replies,
          },
        },
      };
    }
    default: {
      return state;
    }
  }
}

// Function to upload an image to firebase storage
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
        // console.log("Upload is " + progress + "% done");
      },
      (error) => {
        console.error(error);
        reject(error);
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          // console.log("File available at", downloadURL);
          // Resolve with an object that includes both the URL and the name
          resolve({ url: downloadURL, name: image.name });
        });
      }
    );
  });
};

// Create the context that will provide the state, dispatch function and actions to the components
export const AppStateContext = createContext<
  [
    State,
    React.Dispatch<Action>,
    {
      createData: (
        collection: "users" | "posts" | "feedbacks" | "comments",
        id: string,
        userId: string,
        data: any
      ) => void;
      createReply: (
        userId: string, // The ID of the user who is making the reply
        postId: string, // The ID of the post to which the reply belongs
        commentId: string, // The ID of the comment to which the reply belongs
        data: Reply // The data of the reply
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
      ) => Promise<any>;
    }
  ]
>([
  initialState,
  () => null,
  {
    createData: () => {},
    updateData: () => {},
    deleteData: () => {},
    fetchData: () => Promise.resolve(), // return a Promise
    createReply: () => {},
  },
]);

// Define a provider component that will provide the state and actions to the components in its tree
export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Fetch data on component mount
  useEffect(() => {
    async function fetchData() {
      const snap = await get(child(dbRefFetch, "users/"));
      dispatch({ type: "SET_USERS", payload: snap.val() });

      const snapPosts = await get(child(dbRefFetch, "posts/"));
      dispatch({ type: "SET_POSTS", payload: snapPosts.val() });

      const snapComments = await get(child(dbRefFetch, "comments/"));
      dispatch({ type: "SET_COMMENTS", payload: snapComments.val() });

      const snapFeedbacks = await get(child(dbRefFetch, "feedbacks/"));
      dispatch({ type: "SET_FEEDBACKS", payload: snapFeedbacks.val() });
    }
    fetchData();
  }, []);

  // Function to fetch data from firebase and dispatch it to the reducer
  const fetchData = (
    path: string,
    actionType: "SET_USERS" | "SET_POSTS" | "SET_COMMENTS" | "SET_FEEDBACKS" // Add SET_COMMENTS here
  ) => {
    return get(child(dbRefFetch, path)) // add return here
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          dispatch({ type: actionType, payload: data });
          return data; // and return data here
        } else {
          // console.log("No data available");
          return null; // and here
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Function to create new data in firebase and then fetch the updated data
  const createData = (
    path: "users" | "posts" | "comments" | "feedbacks" | "replies",
    id: string,
    userId: string,
    data: User | Post | Comment | Feedback | Reply,
    parentId?: string
  ) => {
    let newPath;
    if (path === "comments") {
      newPath = `${path}/${(data as Comment).userId}-${
        (data as Comment).postId
      }/${(data as Comment).commentId}`;
    } else if (path === "replies") {
      // Handle case for replies
      newPath = `comments/${parentId}/replies/${id}`;
    } else if (path === "posts") {
      newPath = `${path}/${userId}-${id}`;
    } else {
      newPath = `${path}/${id}`;
    }

    set(ref(dbRef, newPath), data)
      .then(() => {
        if (path === "replies") {
          fetchData(
            `comments/${(data as Comment).userId}-${(data as Comment).postId}`,
            "SET_COMMENTS"
          );
        } else {
          fetchData(
            path,
            `SET_${path.toUpperCase()}` as
              | "SET_USERS"
              | "SET_POSTS"
              | "SET_COMMENTS"
              | "SET_FEEDBACKS"
          );
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Function to update data in firebase and then fetch the updated data
  const updateData = (
    path: "users" | "posts" | "comments" | "feedbacks" | "replies", // Add "replies" here
    id: string,
    userId: string,
    data: Partial<User | Post | Comment | Feedback | Reply>, // Add Reply here
    parentId?: string
  ) => {
    let refPath;
    if (path === "replies") {
      // Handle case for replies
      refPath = `comments/${userId}-${parentId}/replies/${id}`;
    } else {
      refPath = `${path}/${userId}-${id}`;
    }

    update(ref(dbRef, refPath), data)
      .then(() => {
        if (path === "replies") {
          fetchData(`comments/${userId}-${parentId}`, "SET_COMMENTS");
        } else {
          fetchData(
            path,
            `SET_${path.toUpperCase()}` as
              | "SET_USERS"
              | "SET_POSTS"
              | "SET_COMMENTS"
              | "SET_FEEDBACKS"
          );
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Function to delete data in firebase and then fetch the updated data
  const deleteData = (
    path: "users" | "posts" | "comments" | "feedbacks" | "replies", // Add "replies" here
    id: string,
    userId: string,
    parentId?: string
  ) => {
    let refPath;
    if (path === "replies") {
      // Handle case for replies
      refPath = `comments/${userId}-${parentId}/replies/${id}`;
    } else {
      refPath = `${path}/${userId}-${id}`;
    }

    remove(ref(dbRef, refPath))
      .then(() => {
        if (path === "replies") {
          fetchData(`comments/${userId}-${parentId}`, "SET_COMMENTS");
        } else {
          fetchData(
            path,
            `SET_${path.toUpperCase()}` as
              | "SET_USERS"
              | "SET_POSTS"
              | "SET_COMMENTS"
              | "SET_FEEDBACKS"
          );
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const createReply = (
    commentUserId: string,
    commentPostId: string,
    commentId: string,
    data: Reply
  ) => {
    const refPath = `comments/${commentUserId}-${commentPostId}/${commentId}/replies`;

    const newReplyRef = push(ref(dbRef, refPath));
    const replyId = newReplyRef.key;

    set(ref(dbRef, `${refPath}/${replyId}`), data)
      .then(() => {
        fetchData(`comments/${commentUserId}-${commentPostId}`, "SET_COMMENTS");
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
          createReply,
        },
      ]}
    >
      {children}
    </AppStateContext.Provider>
  );
}

// Custom hook to use the AppStateContext
export function useAppState() {
  return useContext(AppStateContext);
}

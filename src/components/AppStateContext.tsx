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
  likes: string[];
  comments: Record<string, Comment>;
  views: number;
  downloads: number;
  commentsCount: number;
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
export interface ViewCountIncrementPayload {
  postId: string;
  viewCount: number;
}

interface DownloadCountIncrementPayload {
  postId: string;
  downloadCount: number;
}

export interface CommentCountIncrementPayload {
  postId: string;
  commentCount: number;
}

export interface LikesPayload {
  postId: string;
  like: boolean;
  postUserId: string;
}

export interface LikesReducerPayload {
  postId: string;
  likes: string[];
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
  | { type: "SET_FEEDBACKS"; payload: Record<string, Feedback> }
  | { type: "INCREMENT_VIEW_COUNT"; payload: ViewCountIncrementPayload }
  | {
      type: "INCREMENT_DOWNLOAD_COUNT";
      payload: DownloadCountIncrementPayload;
    }
  | { type: "INCREMENT_COMMENT_COUNT"; payload: CommentCountIncrementPayload }
  | { type: "SET_LIKE"; payload: LikesReducerPayload };

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
    case "SET_POSTS": {
      // Convert the object of posts to an array of posts
      const postsArray = Object.values(action.payload);

      // Calculate comment counts and update the posts
      const postsWithViewsAndComments = postsArray.reduce(
        (postsDict: Record<string, Post>, post: Post) => {
          if (!post.hasOwnProperty("views")) {
            post.views = 0;
          }
          if (!post.hasOwnProperty("comments")) {
            post.comments = {};
          }
          return { ...postsDict, [post.id]: { ...post } };
        },
        {}
      );

      return { ...state, posts: postsWithViewsAndComments };
    }

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

    case "INCREMENT_DOWNLOAD_COUNT": {
      const { postId, downloadCount } = action.payload;

      // Update the download count in Firebase
      const postKey = `${state.posts[postId].userId}-${postId}`;
      update(ref(dbRef, `posts/${postKey}`), {
        downloads: downloadCount,
      }).catch((error) => {
        console.error("Error updating download count:", error);
      });

      // Update the download count in local state (Redux store)
      const updatedPosts = {
        ...state.posts,
        [postId]: {
          ...state.posts[postId],
          downloads: downloadCount,
        },
      };

      return {
        ...state,
        posts: updatedPosts,
      };
    }

    case "INCREMENT_COMMENT_COUNT": {
      const { postId, commentCount } = action.payload;

      // Update the download count in Firebase
      const postKey = `${state.posts[postId].userId}-${postId}`;
      update(ref(dbRef, `posts/${postKey}`), {
        commentsCount: commentCount,
      }).catch((error) => {
        console.error("Error updating comments count:", error);
      });

      // Update the comment count in the local state (Redux store)
      const updatedPosts = {
        ...state.posts,
        [postId]: {
          ...state.posts[postId],
          commentsCount: commentCount,
        },
      };

      return {
        ...state,
        posts: updatedPosts,
      };
    }

    case "INCREMENT_VIEW_COUNT": {
      const { postId, viewCount } = action.payload;

      // Create the correct post ID in the format "userId-postId"
      const postKey = `${state.posts[postId].userId}-${postId}`;

      // Update the view count in the local state (Redux store)
      const updatedPosts = {
        ...state.posts,
        [postId]: {
          ...state.posts[postId],
          views: viewCount,
        },
      };

      // Update the view count in Firebase
      update(ref(dbRef, `posts/${postKey}`), {
        views: viewCount,
      })
        .then(() => {
          console.log("View count updated successfully!");
          // After successfully updating the view count, remove the duplicate entry
          return remove(ref(dbRef, `posts/${postId}`));
        })
        .then(() => {
          console.log("Duplicate entry removed successfully!");
        })
        .catch((error) => {
          console.error("Error updating view count:", error);
        });

      return {
        ...state,
        posts: updatedPosts,
      };
    }

    case "SET_LIKE":
      const { postId, likes }: any = action.payload;
      const updatedPosts = {
        ...state.posts,
        [postId]: {
          ...state.posts[postId],
          likes,
        },
      };
      return { ...state, posts: updatedPosts };

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
        actionType: "SET_USERS" | "SET_POSTS" | "SET_FEEDBACKS" | "SET_COMMENTS"
      ) => Promise<any>;
      incrementViewCount: (payload: ViewCountIncrementPayload) => void;
      incrementDownloadCount: (payload: DownloadCountIncrementPayload) => void;
      incrementCommentCount: (payload: CommentCountIncrementPayload) => void;
      setLike: (payload: LikesPayload) => void;
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
    incrementViewCount: () => {}, // Initialize the function
    incrementDownloadCount: () => {}, // Initialize the function
    incrementCommentCount: () => {},
    setLike: () => {},
  },
]);

// Define a provider component that will provide the state and actions to the components in its tree
export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const incrementDownloadCount = (payload: DownloadCountIncrementPayload) => {
    dispatch({ type: "INCREMENT_DOWNLOAD_COUNT", payload });
  };

  const incrementCommentCount = (payload: CommentCountIncrementPayload) => {
    dispatch({ type: "INCREMENT_COMMENT_COUNT", payload });
  };

  const setLike = (payload: LikesPayload) => {
    const userId = localStorage.getItem("UserID") || "";
    const post = state.posts[payload.postId] as Post;
    let likes = post.likes || [];
    if (payload.like) {
      // add like
      likes.push(userId);
    } else {
      // remove like
      likes = likes.filter((_) => _ !== userId);
    }
    // save to db
    const postKey = `${payload.postUserId}-${payload.postId}`;
    update(ref(dbRef, `posts/${postKey}`), {
      likes,
    }).catch((error) => {
      console.error("Error updating likes:", error);
    });

    const reducerPayload: LikesReducerPayload = {
      likes,
      postId: payload.postId,
    };
    dispatch({ type: "SET_LIKE", payload: reducerPayload });
  };

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
    actionType: "SET_USERS" | "SET_POSTS" | "SET_COMMENTS" | "SET_FEEDBACKS"
  ) => {
    return get(child(dbRefFetch, path))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          if (actionType === "SET_COMMENTS")
            dispatch({ type: actionType, payload: data });
          return data;
        } else {
          return null;
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
        fetchData(`comments`, "SET_COMMENTS");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Function to increment view count and update the database
  const incrementViewCount = async (payload: ViewCountIncrementPayload) => {
    const { postId, viewCount } = payload;
    try {
      // Send a request to the server to update the view count in the database
      const viewCountRef = ref(dbRef, `posts/${postId}/views`);
      await set(viewCountRef, viewCount); // Set the view count to the new value

      // Fetch the updated view count from the server and update the local state using the reducer
      const updatedViewCountSnap = await get(viewCountRef);
      const updatedViewCount = updatedViewCountSnap.val() || 0; // If the value is null, use 0 as the default
      dispatch({
        type: "INCREMENT_VIEW_COUNT",
        payload: { postId, viewCount: updatedViewCount },
      });
    } catch (error) {
      console.error("Error updating view count:", error);
    }
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
          incrementViewCount,
          incrementDownloadCount,
          incrementCommentCount,
          setLike,
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

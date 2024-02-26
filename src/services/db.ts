import { getFirestore, doc, setDoc, getDoc, query, collection, limit, getDocs, startAfter, QueryDocumentSnapshot, orderBy } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { Comment, Post, Stats } from "../models/Post";
import uuidv4 from 'uuidv4';
import { User } from "../models/User";
import { initializeApp } from "firebase/app";
import { getDateInMillis } from "../utils/utils";
import { getNameAndId } from "../utils/helper";
import { getDatabase, ref as realTimeRef, set, update, onValue, increment, remove } from "firebase/database";
import { useCallback, useEffect, useState } from "react";
import {
  getAuth,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  databaseURL: import.meta.env.VITE_databaseURL,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
  measurementId: import.meta.env.VITE_measurementId,
};
initializeApp(firebaseConfig);

const docFetchLimit = 30;
const database = getFirestore();
const databsePostRef = collection(database, "posts");
const storage = getStorage();
const postStorageRef = ref(storage, 'posts');
const databaseUsersRef = collection(database, "users");

const realTimeDatabase = getDatabase();

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


// Function to check for an existing user profile or create a new one
const checkOrCreateUserProfile = async (user: any) => {
  const userRef = doc(database, "users", user.uid);
  const docSnap = await getDoc(userRef);

  if (!docSnap.exists()) {
    // Create a new user profile if it doesn't exist
    await setDoc(userRef, {
      uid: user.uid,
      email: user.email,
      createdAt: new Date(),
      // Add any other default fields you need
    });
    console.log("User profile created");
  } else {
    console.log("User profile exists");
  }
};

// Function to send sign-in link to email
export const sendLoginLinkToEmail = async (email: any) => {
  console.log("Sending sign-in link to email:", email);
  try {
    const actionCodeSettings = {
      url: 'http://localhost:5173/login',
      handleCodeInApp: true,
    };
    await sendSignInLinkToEmail(auth, email, actionCodeSettings);
    window.localStorage.setItem('emailForSignIn', email);
    console.log("Sign-in link sent to:", email);
  } catch (error) {
    console.error("Error sending sign-in link to email:", error);
  }
};


// Modify your existing function to include profile check/creation
export const completeSignInWithEmailLink = async (email: string, windowLocationHref: string) => {
  try {
    if (isSignInWithEmailLink(auth, windowLocationHref)) {
      const result = await signInWithEmailLink(auth, email, windowLocationHref);
      // Clear email from local storage
      window.localStorage.removeItem('emailForSignIn');
      // Check or create user profile in Firestore
      await checkOrCreateUserProfile(result.user);
      console.log("User signed in:", result.user.uid);
      return result.user; // You might want to return the user object or profile information here
    }
  } catch (error) {
    console.error("Error signing in with email link:", error);
  }
};

export const getPosts = async (lastVisible?: QueryDocumentSnapshot) => {
  let first = query(databsePostRef, limit(docFetchLimit), orderBy('createdAt', 'desc'));
  if (lastVisible) {
    first = query(first, startAfter(lastVisible));
  }
  const documentSnapshots = await getDocs(first);
  const updatedLastVisible = documentSnapshots.docs.length === docFetchLimit ? documentSnapshots.docs[documentSnapshots.docs.length - 1] : undefined;
  return { docs: documentSnapshots.docs.map(_ => _.data() as Post), lastVisible: updatedLastVisible }
}

export const getTagsFromDatabase = async (): Promise<string[]> => {
  const querySnapshot = await getDocs(query(databsePostRef));
  const tags = new Set<string>();

  querySnapshot.forEach((docSnapshot) => {
    const post = docSnapshot.data() as Post;
    // Check if tags exist before attempting to iterate over them
    if (post.tags) {
      post.tags.forEach(tag => tags.add(tag));
    }
  });

  return Array.from(tags);
};

export const getPostById =async (postId: string) => {
  const docRef = doc(databsePostRef, postId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data() as Post;
  }
  return null;
}

export const addPost = async (post: Post) => {
  await setDoc(doc(databsePostRef, post.id), post);
}

export const uploadImage = async (image: File, onProgress: (progress: number) => void) => {
  const fileName = uuidv4(); // Capture the generated file name
  const uploadTask = uploadBytesResumable(ref(postStorageRef, fileName), image);

  return new Promise<{ url: string; name: string }>((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        onProgress(progress);
      },
      (error) => {
        console.error(error);
        reject(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          resolve({ url: downloadURL, name: fileName }); // Return the captured file name
        });
      }
    );
  });
};


export const addUser = async (user: User) => {
  await setDoc(doc(databaseUsersRef, user.id), user);
}

export const useCommentsHook = (postId: string) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const ref = realTimeRef(realTimeDatabase, `comments/${postId}`);

  const getData = useCallback(() => {
    onValue(ref, (commentsSnapshot) => {
      const commentsMap = commentsSnapshot.val() as { [key: string]: Comment };
      const newComments: Comment[] = [];
      Object.keys(commentsMap).map(key => {
        const comment = commentsMap[key];
        newComments.push(comment);
      });
      setComments(newComments.sort((a, b) => a.createdAt > b.createdAt ? -1 : 1));
    });
  }, [postId]);

  
  return { comments, getData };
}

export const postComment = async (postId: string, text: string, commentId?: string,) => {
  const { id, name } = getNameAndId();
  const comment: Comment = {
    id: uuidv4(),
    text,
    userId: id,
    userName: name,
    createdAt: getDateInMillis(),
    postId,
  }
  if (commentId) {
    // write in replies of a parent comment
    const newRef = realTimeRef(realTimeDatabase, `comments/${postId}/${commentId}/replies/${comment.id}`);
    return await set(newRef, comment);
  }
  // create a new comment ref
  const newRef = realTimeRef(realTimeDatabase, `comments/${postId}/${comment.id}`)
  await set(newRef, comment);
  incrementStats(postId, StatType.Comment);
}

export enum StatType {
  Comment = 'Comment', 
  Views = 'Views', 
  Download = 'Download',
  Likes = 'Likes',
}

export const incrementStats = async (postId: string, type: StatType, decrement?: boolean) => {
  const updates: {[key: string]: any} = {};
  updates[`stats/${postId}/${type}`] = increment(decrement ? -1 : 1);
  update(realTimeRef(realTimeDatabase), updates);
}

export const useStats = (postId: string) => {
  const [stats, setStats] = useState<Stats | undefined>();
  const ref = realTimeRef(realTimeDatabase, `stats/${postId}`);

  const getData = useCallback(() => {
    onValue(ref, (statsSnapshot) => {
      setStats(statsSnapshot.val() as Stats);
    });
  }, [postId, ref]);

  
  return { stats, getData };
}

export const useLikes = (postId: string) => {
  const {id} = getNameAndId();
  const [liked, setLiked] = useState(false);
  const ref = realTimeRef(realTimeDatabase, `likes/${postId}/${id}`);

  useEffect(() => {
    getData();
  }, [postId, id]);

  const getData = useCallback(() => {
    onValue(ref, (snapshot) => {
      if (snapshot.exists()) {
        setLiked(true);
        return;
      }
      setLiked(false);
    });
  }, [ref]);

  const toggleLike = useCallback(async () => {
    if (!liked) {
      incrementStats(postId, StatType.Likes);
      return await set(ref, {createdAt: getDateInMillis()});
    }
    incrementStats(postId, StatType.Likes, true);
    remove(ref);
  }, [ref])

  return {liked, toggleLike}

}
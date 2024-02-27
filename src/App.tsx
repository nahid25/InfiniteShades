import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css'
import { HomeScreen } from "./screens/Homescreen/HomeScreen";
import { initializeApp } from "firebase/app";
import AboutPage from "./screens/About/AboutPage";
import Login from "./screens/Login/Login";
import ViewPostScreen from "./screens/ViewPost/ViewPostScreen";
import { getAuth, isSignInWithEmailLink } from "firebase/auth";
import { useEffect } from "react";
import { completeSignInWithEmailLink } from "./services/db";
import UserProfile from "./screens/User/UserProfile";
import UserSettings from "./screens/User/UserSettings";

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

function App() {
  initializeApp(firebaseConfig);
  const auth = getAuth(); // Get the Auth instance

  useEffect(() => {
    // Check if the URL is a sign-in with email link.
    if (isSignInWithEmailLink(auth, window.location.href)) { // Corrected usage
      let email = window.localStorage.getItem('emailForSignIn');
      if (!email) {
        email = window.prompt('Please provide your email for confirmation');
      }
      if (email) {
        completeSignInWithEmailLink(email, window.location.href)
          .then(() => {
            // Redirect to the homepage or dashboard after sign-in
            window.location.assign('/');
          });
      }
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/UserProfile" element={<UserProfile /> } />
        <Route path="/post/:postId" element={<ViewPostScreen />} />
        <Route path="/User/Settings" element={<UserSettings /> } />
      </Routes>
    </Router>
  )
}

export default App
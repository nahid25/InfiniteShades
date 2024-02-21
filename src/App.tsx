import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css'
import { HomeScreen } from "./screens/Homescreen/HomeScreen";
import { initializeApp } from "firebase/app";
import AboutPage from "./screens/About/AboutPage";
import Login from "./screens/Login/Login";
import ViewPostScreen from "./screens/ViewPost/ViewPostScreen";

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

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/post/:postId" element={<ViewPostScreen />} />
      </Routes>
    </Router>
  )
}

export default App

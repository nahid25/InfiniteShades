<<<<<<< HEAD
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
=======
import { Link } from "react-router-dom";
import "./App.css";
import Layout from "./components/shared/Layout";
import { PrimaryButton } from "./components/shared/Button";
import CreatePost from "./components/CreatePost/CreatePost";
import ResponsiveLayout from "./components/ReadPost/ResponsiveLayout";

function App() {
  return (
    <Layout
      createCustomButton={[
        <Link key="1" to="/about">
          <PrimaryButton buttonText={"About"} />
        </Link>,
        <Link key="2" to="/">
          <PrimaryButton buttonText={"Home"} _disabled={true} />
        </Link>,
        <CreatePost key="3" />,
      ]}
      children={<ResponsiveLayout />}
    ></Layout>
  );
}

export default App;
>>>>>>> main

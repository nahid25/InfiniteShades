import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import AboutPage from "./components/About/AboutPage";
import PostPage from "./components/ReadPost/MobileUIPage/PostPage";
import Login from "./components/LoginPage/Login";

function Index() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/post/:postId/:userId" element={<PostPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default Index;

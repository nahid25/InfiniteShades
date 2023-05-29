import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import AboutPage from "./components/About/AboutPage";

function Index() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </Router>
  );
}

export default Index;

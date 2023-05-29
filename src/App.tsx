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

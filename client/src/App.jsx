import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import "./index.css";

import Login from "./pages/login/Login.jsx";
import Signup from "./pages/signup/Signup.jsx";
import Home from "./pages/home/Home.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* <Login/> */}
      {/* <Signup/> */}

      <div className="h-screen w-screen flex justify-center items-center">
        <Home/>
      </div>
    </>
  );
}

export default App;

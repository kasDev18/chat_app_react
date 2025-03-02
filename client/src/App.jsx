import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import Login from "./pages/login/Login.jsx";
import Signup from "./pages/signup/Signup.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* <Login/> */}
      <Signup/>
    </>
  );
}

export default App;

import { useContext } from "react";
// import "./App.css";
// import "./index.css";
import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes } from "react-router-dom";

import Login from "./pages/login/Login.jsx";
import Signup from "./pages/signup/Signup.jsx";
import Home from "./pages/home/Home.jsx";
import { AuthContext } from "./context/AuthContext.jsx";
function App() {
  const { authUser } = useContext(AuthContext);

  return (

    <>
      <div className="h-screen w-screen flex justify-center items-center">  
        <Routes>
          <Route path="/" element={authUser ? <Home /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={authUser ? <Navigate to="/" /> : <Signup />} />
        </Routes>
        <Toaster/>
      </div>
    </>
  );
}

export default App;

import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";
import { useAuthContext } from "../../context/AuthContext";

const inputStyle = "input input-warning xl:w-120 text-black bg-transparent border-none placeholder:text-gray-400 xl:input-xl md:input-lg input-sm";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading } = useLogin();
  const { useAuthUser } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(email, password);    
    if (success) {
      useAuthUser(success);
    }
  };

  return (
    <div className="h-screen w-screen bg-[#984FD2] font-display">
      <div className="triangle absolute"></div>
      <div className="flex flex-1 h-screen w-screen absolute">
        <div className="absolute w-screen flex justify-end p-5">
          <Link to="/signup" className="btn btn-warning btn-sm xl:btn-wide xl:h-[4vh] md:btn-md xl:text-xl mx-2">
            Signup
          </Link>
          <button className="btn btn-warning btn-circle mx-2 btn-sm xl:w-[3vw] xl:h-[4vh] xl:text-xl md:btn-md">?</button>
        </div>
        <div className="xl:w-[60%] lg:w-[60%] md:w-[90%] w-[200%] flex items-center justify-center border rounded-r-full bg-white">
          <div className="xl:hidden opacity-8 md:rounded-full flex items-center justify-center bg-white relative xl:top-30 md:top-30">
            <img
              className="md:w-[90%] w-70"
              src="/images/chat2.png"
              alt="login-chat-bg"
            />
          </div>
          <form
            className="absolute h-[50%] w-[50%] flex flex-col p-5 items-center"
            onSubmit={handleSubmit}
          >
            <div className="flex justify-center">
              <img
                className="w-1/2 xl:w-[15vw]"
                src="/images/chatapp_logo.jpg"
                alt="login-chatapp-logo"
              />
            </div>
            <div className="flex flex-col items-center justify-center my-5">
              <h1 className="font-bold text-[#764C9E] xl:text-3xl sm:text-sm md:text-xl mb-2">
                Connect with your favorite people
              </h1>
              <hr className="bolder border-2 border-[#764C9E] xl:w-130 md:w-90 w-70" />
            </div>
            <div className="xl:w-120 md:w-80 w-60">
              <div className="">
                <input
                  type="text"
                  className={inputStyle}
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <hr className="bolder border-1 border-[#EFA21E]" />
              </div>
              <div className="my-5">
                <input
                  type="password"
                  className={inputStyle}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <hr className="bolder border-1 border-[#EFA21E]" />
              </div>
              <div className="my-5">
                <button className="btn btn-outline btn-warning w-60 xl:w-120 md:w-80 md:btn-lg btn-sm" disabled={loading}>
                  {loading ? <span className="loading loading-spinner"></span> : "Login"}
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="lg:flex hidden items-center justify-center">
          <img src="/images/cp4.png" className="w-[100%] h-[50%] xl:w-[100%] xl:h-[80%] lg:w-[100%] lg:h-[80%]" alt="login-mobile-phone"/>
        </div>
      </div>
    </div>
  );
}

export default Login;

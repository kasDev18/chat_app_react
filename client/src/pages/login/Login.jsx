import React from "react";

function Login() {
  return (
    <div className="h-screen w-screen bg-[#984FD2] font-display">
      <div className="triangle absolute"></div>
      <div className="flex flex-1 h-screen w-screen absolute">
        <div className="absolute w-screen flex justify-end p-5">
          <button className="btn btn-warning mx-2">Signup</button>
          <button className="btn btn-warning btn-circle mx-2">?</button>
        </div>
        <div className="w-[50%] flex items-center justify-center">
          <div className="opacity-8 flex items-center justify-center">
            <img
              className=""
              src="/images/chat2.png"
              alt=""
              width={"100%"}
              height={"100%"}
            />
          </div>
          <form className="absolute h-[50%] w-[50%] flex flex-col p-5 items-center">
            <div className="flex justify-center">
              <img
                className="chat-bg"
                src="/images/chatapp_logo.jpg"
                alt=""
                width={"20%"}
                height={"20%"}
              />
            </div>
            <div className="flex flex-col items-center justify-center my-10">
              <h1 className="font-bold text-[#764C9E] text-xl mb-2">
                Connect with your favorite people
              </h1>
              <hr className="bolder border-2 border-[#764C9E] w-90" />
            </div>
            <div className="w-80 ">
              <div className="">
                <input
                  type="text"
                  className="input input-warning text-black w-80 bg-transparent border-none placeholder:text-gray-400"
                  placeholder="Email"
                />
                <hr className="bolder border-1 border-[#EFA21E]" />
              </div>
              <div className="my-5">
                <input
                  type="password"
                  className="input input-warning text-black w-80 bg-transparent border-none placeholder:text-gray-400"
                  placeholder="Password"
                />
                <hr className="bolder border-1 border-[#EFA21E]" />
              </div>
              <div className="my-5">
                <button className="btn btn-outline btn-warning w-80">
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="w-[50%] flex items-center justify-center">
          <img src="/images/cp4.png" alt="" width={"50%"} height={"50%"} />
        </div>
      </div>
    </div>
  );
}

export default Login;

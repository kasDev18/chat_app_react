import React from "react";

import GenderCheckbox from "./GenderCheckbox";
import { Link } from "react-router-dom";
import useSignup from "../../hooks/useSignup";

const chat_bg = {
  opacity: "10%",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "20%",
  height: "20%",
};

function Signup() {
  const [inputs, setInputs] = React.useState({
    fullName: "",
    emailAddress: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const {loading, signup} = useSignup();

  const handleCheckboxChange = (gender) => {
    setInputs({
      ...inputs,
      gender,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(inputs);
  };
  return (
    <div className="h-screen w-screen bg-[#984FD2] font-display sm:flex justify-center items-center">
      <div className="background-chat-imgs sm:flex hidden">
        <img
          src="/images/chat2.png"
          alt=""
          className={
            "opacity-20 absolute top-1/4 left-50 transform-translate-x-1/2 -translate-y-1/2"
          }
        />
        {/* <img
          src="/images/chat2.png"
          alt=""
          className={
            "opacity-20 absolute top-1/2 left-1/4 bg-amber-300"
          }
        /> */}
        <img
          src="/images/chat2.png"
          width={"10%"}
          height={"10%"}
          alt=""
          className={
            "opacity-20 absolute top-4/8 left-5/6 transform-translate-x-1/2 -translate-y-1/2"
          }
        />
        <img
          src="/images/chat2.png"
          width={"10%"}
          height={"10%"}
          alt=""
          className={
            "opacity-20 absolute top-1/10 left-7/8 transform-translate-x-1/2 -translate-y-1/2"
          }
        />
        <img
          src="/images/chat2.png"
          alt=""
          width={"10%"}
          height={"10%"}
          className={
            "opacity-20 absolute top-5/6 left-50 transform-translate-x-1/2 -translate-y-1/2"
          }
        />
      </div>
      <div className="flex justify-center items-center flex-1 h-screen md:w-20 relative p-2">
        <div className="bg-white border-8 border-amber-300 px-5 pt-5">
          <img
            src="/images/chatapp_logo.jpg"
            className="mx-auto w-[35%] h-[35%] lg:w-[15%] lg:h-[15%]"
            alt="signup-chatapp-logo"
          />
          <div className="lg:m-10 mt-5">
            <div className="text-[#764C9E] lg:grid flex flex-col items-center sm:justify-center lg:justify-start">
              <h1 className="md:text-lg text-md font-bold">Get Started Now</h1>
              <h2 className="lg:text-lg md:text-md text-[11px]">Enter your Credentials to Create your account</h2>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center">
              <div className=" my-5 text-[#EFA21E]">
                <div className="flex flex-col lg:my-3 my-2">
                  <label className="lg:text-sm text-xs" htmlFor="name">Name</label>
                  <input
                    className="input input-warning bg-transparent input-xs w-60 lg:w-100"
                    value={inputs.fullName}
                    onChange={(e) =>
                      setInputs({ ...inputs, fullName: e.target.value })
                    }
                  />
                </div>
                <div className="flex flex-col lg:my-5 my-2">
                  <label className="lg:text-sm text-xs" htmlFor="email_address">Email Address</label>
                  <input
                    className="input input-warning bg-transparent input-xs w-full lg:w-100"
                    value={inputs.emailAddress}
                    onChange={(e) =>
                      setInputs({ ...inputs, emailAddress: e.target.value })
                    }
                  />
                </div>
                <div className="flex flex-col lg:my-5 my-2">
                  <label className="lg:text-sm text-xs" htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="input input-warning bg-transparent input-xs w-full lg:w-100"
                    value={inputs.password}
                    onChange={(e) =>
                      setInputs({ ...inputs, password: e.target.value })
                    }
                  />
                </div>
                <div className="flex flex-col lg:my-5 my-2">
                  <label className="lg:text-sm text-xs" htmlFor="confirm_password">Confirm Password</label>
                  <input
                    type="password"
                    className="input input-warning bg-transparent input-xs w-full lg:w-100"
                    value={inputs.confirmPassword}
                    onChange={(e) =>
                      setInputs({ ...inputs, confirmPassword: e.target.value })
                    }
                  />
                </div>
                <GenderCheckbox
                  onCheckboxChange={handleCheckboxChange}
                  selectedGender={inputs.gender}
                />
                <div className="flex flex-col justify-center md:mt-5">
                  <button className="btn bg-[#3DA9F1] text-white border-3 border-[#BEE9FF] my-1 btn-sm" disabled={loading}>
                    {loading ? <span className="loading loading-spinner"></span> : "Sign Up"}
                  </button>
                  <Link to="/login">
                    <button className="btn bg-[#EFA21E] text-white border-3 border-[#FFCD00] my-1 btn-sm w-full">
                      Back
                    </button>
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 

export default Signup;

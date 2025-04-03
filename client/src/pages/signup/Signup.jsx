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
    <div className="h-screen w-screen bg-[#984FD2] font-display">
      <div className="background-chat-imgs">
        <img
          src="/images/chat2.png"
          alt=""
          className={
            "opacity-20 absolute top-1/4 left-50 transform -translate-x-1/2 -translate-y-1/2"
          }
        />
        <img
          src="/images/chat2.png"
          alt=""
          className={
            "opacity-20 absolute top-2/3 left-3/5 transform -translate-x-1/2 -translate-y-1/2"
          }
        />
        <img
          src="/images/chat2.png"
          width={"10%"}
          height={"10%"}
          alt=""
          className={
            "opacity-20 absolute top-4/8 left-5/6 transform -translate-x-1/2 -translate-y-1/2"
          }
        />
        <img
          src="/images/chat2.png"
          width={"10%"}
          height={"10%"}
          alt=""
          className={
            "opacity-20 absolute top-1/10 left-7/8 transform -translate-x-1/2 -translate-y-1/2"
          }
        />
        <img
          src="/images/chat2.png"
          alt=""
          width={"10%"}
          height={"10%"}
          className={
            "opacity-20 absolute top-5/6 left-50 transform -translate-x-1/2 -translate-y-1/2"
          }
        />
      </div>
      <div className="flex justify-center items-center flex-1 h-screen w-screen absolute ">
        <div className="bg-white border-8 border-amber-300 p-5">
          <img
            src="/images/chatapp_logo.jpg"
            width={"15%"}
            height={"15%"}
            alt=""
          />
          <div className="m-15">
            <div className="text-[#764C9E]">
              <h1 className="text-3xl font-bold">Get Started Now</h1>
              <h2>Enter your Credentials to Create your account</h2>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="my-10 text-[#EFA21E]">
                <div className="my-5">
                  <label htmlFor="">Name</label>
                  <input
                    type="text"
                    className="input input-warning bg-transparent"
                    value={inputs.fullName}
                    onChange={(e) =>
                      setInputs({ ...inputs, fullName: e.target.value })
                    }
                  />
                </div>
                <div className="my-5">
                  <label htmlFor="email_address">Email Address</label>
                  <input
                    type="email"
                    className="input input-warning bg-transparent"
                    value={inputs.emailAddress}
                    onChange={(e) =>
                      setInputs({ ...inputs, emailAddress: e.target.value })
                    }
                  />
                </div>
                <div className="my-5">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="input input-warning bg-transparent"
                    value={inputs.password}
                    onChange={(e) =>
                      setInputs({ ...inputs, password: e.target.value })
                    }
                  />
                </div>
                <div className="my-5">
                  <label htmlFor="confirm_password">Confirm Password</label>
                  <input
                    type="password"
                    className="input input-warning bg-transparent"
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
                <div className="flex flex-col justify-center my-5">
                  <button className="btn bg-[#3DA9F1] text-white border-3 border-[#BEE9FF] w-80 my-1" disabled={loading}>
                    {loading ? <span className="loading loading-spinner"></span> : "Sign Up"}
                  </button>
                  {/* <button className="btn bg-[#EFA21E] text-white border-3 border-[#FFCD00] w-80 my-1">
                    <Link to="/login">Back</Link>
                  </button> */}
                  <Link to="/login">
                    <button className="btn bg-[#EFA21E] text-white border-3 border-[#FFCD00] w-80 my-1">
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

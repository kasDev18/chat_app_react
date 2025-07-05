import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import MessageContainer from "../../components/messages/MessageContainer";
import { useAuthContext } from "../../context/AuthContext";

import "../../index.css";

function Home() {
  const { authUser } = useAuthContext();
  return (
    <div className="flex h-screen w-screen md:p-5">
      <Sidebar />
      <MessageContainer />
      <aside className="lg:grid w-1/4 p-5 hidden bg-gray-800">
        <div className="h-full flex flex-col items-center">
          <div className="pt-5">
            <img
              className="rounded-full border-2 border-amber-500"
              width={150}
              height={150}
              loading="eager"
              src={authUser.profilePic || "/images/profile.png"}
              alt=""
              onError={(e) => {
                e.target.onerror = null; /* Prevent infinite loop */
                e.target.src = "/images/profile.png"; /* Fallback image */
              }}
            />
          </div>
          <div className="text-center text-amber-500 text-2xl font-bold mt-5">
            {authUser.fullName}
          </div>
          <span className="text-center text-gray-500">
            Full Stack Developer
          </span>
          <div className="hidden gap-3 mt-5 w-full">
            <a href="/user/edit" className="w-full">
              <button
                id="user-edit-btn"
                type="button"
                className="btn btn-active bg-[#984FD2] w-full"
              >
                Edit
              </button>
            </a>
          </div>
        </div>
      </aside>
    </div>
  );
}

export default Home;

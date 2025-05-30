import React from "react";
import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";

function LogoutButton() {
  const { logout, loading } = useLogout();
  return (
    <div className="mt-auto py-5 w-full">
      {!loading ? (
        // <BiLogOut
        //   className="w-6 h-6 text-white cursor-pointer"
        //   onClick={logout}
        // />
        <button
          className="btn btn-active bg-[#984FD2] w-full"
          onClick={logout}
        >
          Logout</button>
      ) : (
        <span className="loading loading-spinner"></span>
      )}
    </div>
  );
}

export default LogoutButton;

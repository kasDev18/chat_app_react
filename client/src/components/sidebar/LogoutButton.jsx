import React from "react";
import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";

function LogoutButton() {
  const { logout, loading } = useLogout();
  return (
    <div className="mt-auto py-5 pr-5">
      {!loading ? (
        // <BiLogOut
        //   className="w-6 h-6 text-white cursor-pointer"
        //   onClick={logout}
        // />
        <button
          className="btn btn-active btn-secondary w-full"
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

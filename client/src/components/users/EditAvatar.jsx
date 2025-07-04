import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import updateAvatar from "../../hooks/useUpdateAvatar";

export default function EditAvatar() {
  const { authUser } = useAuthContext();
  const [avatar, setAvatar] = useState(null);

  const handleClick = () => {
    const avatarInput = document.getElementById("avatar-input");
    avatarInput.click();
  };

  const handleChange = async (e) => {
    const img = updateAvatar(e, authUser._id);
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-3 border-2 border-gray-700 pb-3 bg-gray-800 p-5 rounded-2xl">
      <img
        id="avatar"
        title="Edit Avatar"
        loading="lazy"
        className="rounded-full border-2 border-amber-500"
        width={110}
        src="https://th.bing.com/th/id/R.e2a8b23a278ed28d089dc4a87dbf50ef?rik=35UwSrV89r9CCw&riu=http%3a%2f%2fgcraftupvc.in%2fassets%2fimages%2fabout%2fabout-shape.png&ehk=xkGFVBAk88y56o6rUD%2fKI%2f0Ke3B28bVGUw8Eebtrjxs%3d&risl=&pid=ImgRaw&r=0"
        alt="profile avatar"
      />
      <div className="flex flex-col justify-center items-center add-edit-avatar">
        <input
          type="file"
          className="hidden"
          accept="image/*"
          id="avatar-input"
          name="avatar-input"
          onChange={handleChange}
        />
        <button
          id="edit-avatar-btn"
          type="button"
          className="btn btn-active bg-gray-900 btn-md hover:bg-[#984FD2] hover:text-white text-white border-2 hover:border-white border-gray-600"
          onClick={handleClick}
        >
          Upload new photo
        </button>
        <p className="text-gray-500 text-sm">{authUser.emailAddress}</p>
      </div>
    </div>
  );
}

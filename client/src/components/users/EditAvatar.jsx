import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import updateAvatar from "../../hooks/useUpdateAvatar";

export default function EditAvatar() {
  const { authUser } = useAuthContext();
  const [avatar, setAvatar] = useState(authUser.profilePic);

  const handleClick = () => {
    const avatarInput = document.getElementById("avatar-input");
    avatarInput.click();
  };

  const handleChange = async (e) => {
    const img = await updateAvatar(e, authUser._id);
    setAvatar(img.profilePic);
  };
  

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-3 border-2 border-gray-700 pb-3 bg-gray-800 p-5 rounded-2xl">
      <img
        id="avatar"
        title="Edit Avatar"
        loading="eager"
        className="rounded-full border-2 border-amber-500"
        style={{ width: 110, height: 110, objectFit: "cover" }}
        src={avatar || "/images/profile.png"}
        alt="profile avatar"
        onError={(e) => {
          e.target.onerror = null; /* Prevent infinite loop */
          e.target.src = "/images/profile.png"; /* Fallback image */
        }}
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

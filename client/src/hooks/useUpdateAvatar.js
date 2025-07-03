import { editAvatar as url } from "../utils/api/routes";
import { cloudinaryConfig } from "../cloudinary/index";
import toast from "react-hot-toast";
import axios from "axios";

const updateAvatar = async (id) => {
    const avatarInput = document.getElementById("avatar-input");
    const img = document.getElementById("avatar");

    avatarInput.click();

    avatarInput.addEventListener("change", async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("profilePic", file);

        try {
            const response = await axios.put(`${url}/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
            });

            const data = response.data;

            if (data.error) {
                toast.error(data.error);
                return;
            }

            // Optionally update the avatar image
            if (data.profilePicUrl) {
                img.src = data.profilePicUrl;
            }
        } catch (error) {
            console.error("Error updating avatar:", error);
            toast.error("Error updating avatar");
        }
    });
}

export default updateAvatar

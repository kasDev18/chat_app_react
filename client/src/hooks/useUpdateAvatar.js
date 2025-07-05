import { editAvatar as url } from "../utils/api/routes";
import toast from "react-hot-toast";
import axios from "axios";

const updateAvatar = async (e, id) => {
    const file = e.target.files[0];

    if (!file) {
        toast.error("No file selected");
        return;
    }

    const format = ["image/jpeg", "image/png", "image/jpg"];
    const formData = new FormData();
    formData.append("profilePic", file);

    try {
        if(!format.includes(file.type)) {
            toast.error("Invalid file type. Only JPEG, PNG, and JPG files are allowed.");
            return;
        }
        
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

        localStorage.setItem("chat-user", JSON.stringify(data.data));
        toast.success(data.message);

        return data.data;
    } catch (error) {
        console.log(error);
        toast.error("Error updating avatar");
    }
}

export default updateAvatar

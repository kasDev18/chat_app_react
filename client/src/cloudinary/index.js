import toast from "react-hot-toast";


export const cloudinaryConfig = (file) => {
    const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME; // Replace with your Cloud Name
    const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET; // Replace with your Upload Preset
    const API_KEY = import.meta.env.VITE_CLOUDINARY_API_KEY; // Replace with your Upload Preset
    const API_SECRET = import.meta.env.VITE_CLOUDINARY_API_SECRET; // Replace with your Upload Preset
    const FOLDER = "Chat App MERN/avatars"; // Custom folder in Cloudinary
    const ALLOWED_FORMATS = ["image/jpeg", "image/png", "image/jpg"]; // Allowed MIME types

    if (file && !ALLOWED_FORMATS.includes(file.type)) {
        console.log("Invalid file type");
        
        // return {
        //     error: true,
        //     code: 406,
        //     message: "Invalid file type. Only JPEG, PNG, and JPG files are allowed.",
        // }

        console.error("Invalid file type. Only JPEG, PNG, and JPG files are allowed.", 406);
        toast.error("Invalid file type. Only JPEG, PNG, and JPG files are allowed.");
        return;        
    }
}
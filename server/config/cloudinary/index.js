import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import ENV from "../env.js";

const env = ENV();

// Configure Cloudinary
cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

// Configure Multer with Cloudinary storage 
export const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'Chat App MERN/avatars',
    allowed_formats: ['jpg', 'png', 'jpeg'],
  },
});
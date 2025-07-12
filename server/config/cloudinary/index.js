import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { cloudinaryConfig } from "../env.js";

// Configure Cloudinary
cloudinary.config({
  cloud_name: cloudinaryConfig.cloudName,
  api_key: cloudinaryConfig.apiKey,
  api_secret: cloudinaryConfig.apiSecret,
});

// Configure Multer with Cloudinary storage 
export const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'Chat App MERN/avatars',
    allowed_formats: ['jpg', 'png', 'jpeg'],
  },
});
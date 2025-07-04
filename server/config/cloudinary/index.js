import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
const {CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_CLOUD_NAME} = process.env;


// Configure Cloudinary
cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

// Configure Multer with Cloudinary storage 
export const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'Chat App MERN/avatars',
    allowed_formats: ['jpg', 'png', 'jpeg'],
  },
});
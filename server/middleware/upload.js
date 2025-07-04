import multer from "multer";
import { storage } from "../config/cloudinary/index.js";

const upload = multer({ storage: storage });

export default upload;
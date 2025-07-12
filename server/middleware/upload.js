import multer from "multer";
import { storage } from "../config/cloudinary/index.js";
import { uploadConfig, isDevelopment } from "../config/env.js";

// File filter function to validate file types
const fileFilter = (req, file, cb) => {
  const allowedTypes = uploadConfig.allowedFileTypes;
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`Invalid file type. Allowed types: ${allowedTypes.join(', ')}`), false);
  }
};

// Configure multer with sanitization and validation
const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
    files: 1 // Only allow 1 file at a time
  }
});

// Error handling middleware for multer
const handleUploadError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ 
        error: `File too large. Maximum size is ${uploadConfig.maxFileSize}` 
      });
    }
    if (err.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({ 
        error: "Too many files. Only one file allowed." 
      });
    }
    return res.status(400).json({ 
      error: "File upload error" 
    });
  }
  
  if (err.message.includes('Invalid file type')) {
    return res.status(400).json({ 
      error: err.message 
    });
  }
  
  if (isDevelopment()) {
    console.error("📁 Upload error:", err.message);
  }
  
  return res.status(500).json({ 
    error: "File upload failed" 
  });
};

export { upload, handleUploadError };
export default upload;
import mongoose from "mongoose";
import { z } from "zod";

// Zod schema for validating user input
export const userZodSchema = z.object({
  fullName: z.string()
    .min(3, "Full name must be at least 3 characters")
    .regex(/^[a-zA-Z ]+$/, "Full name must only contain letters and spaces"),
  emailAddress: z.string()
    .email("Invalid email address")
    .min(5, "Email address must be at least 5 characters"),
  password: z.string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, "Password must contain at least one special character"),
  gender: z.enum(["male", "female"]),
  profilePic: z.string().optional(),
});

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  emailAddress: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  gender: {
    type: String,
    required: true,
    enum: ["male", "female"]
  },
  profilePic: {
    type: String,
    default: ""
  }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;
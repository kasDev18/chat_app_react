import User from "../models/users.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/token.js";
import { userZodSchema } from "../models/users.js";
import { sendValidationError, sendServerError } from "../utils/errorHandler.js";

// Helper to hash password
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export const signup = async (req, res) => {
  try {
    const validation = userZodSchema.safeParse(req.body);
    if (!validation.success) return sendValidationError(res, validation);

    const { fullName, emailAddress, password, confirmPassword, gender } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords don't match" });
    }

    const existingUser = await User.findOne({ emailAddress });
    if (existingUser) {
      return res.status(409).json({ error: "Email address is already registered" });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = new User({
      fullName,
      emailAddress,
      password: hashedPassword,
      gender,
      profilePic: "",
    });

    generateToken(newUser._id, res);
    await newUser.save();

    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      emailAddress: newUser.emailAddress,
      profilePic: newUser.profilePic,
    });
  } catch (err) {
    return sendServerError(res, err, "signup controller");
  }
};

export const login = async (req, res) => {
  try {
    const { emailAddress, password } = req.body;
    const user = await User.findOne({ emailAddress });
    const validPassword = await bcrypt.compare(password, user?.password || "");

    if (!user || !validPassword) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    generateToken(user._id, res);

    res.status(201).json({
      _id: user._id,
      fullName: user.fullName,
      emailAddress: user.emailAddress,
      profilePic: user.profilePic,
    });
  } catch (err) {
    return sendServerError(res, err, "login controller");
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("token", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    return sendServerError(res, err, "logout controller");
  }
};

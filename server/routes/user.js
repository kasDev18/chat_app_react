import express from "express";

import { getUsersForSidebar, updateAvatar } from "../controllers/user.controller.js";

import protectRoute from "../middleware/protectRoute.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/", protectRoute, getUsersForSidebar)

router.put("/update-avatar/:id", protectRoute, upload.single("profilePic"), updateAvatar)

export default router
import express from "express";

import { getUsersForSidebar } from "../controllers/user.controller.js";

import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/users", protectRoute, getUsersForSidebar)

export default router
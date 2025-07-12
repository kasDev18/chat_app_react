import User from "../models/users.js";
import { getCache, setCache } from "../utils/redisClient.js";
export const getUsersForSidebar = async (req, res) => {
  
  try {
    const loginUserId = req.user._id;
    const cacheKey = `users_sidebar_${loginUserId}`;
    const cachedUsers = await getCache(cacheKey);
    if (!cachedUsers) {
      await setCache(cacheKey, filteredUsers, 3600); // cache for 1 hour
    }
    const filteredUsers = await User.find({ _id: { $ne: req.user._id } })
      .select("-password")
      .sort({
        updatedAt: -1,
      });
    res.status(200).json(filteredUsers);
  } catch (err) {
    console.error("Error in getUsers controller:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export const updateAvatar = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // The Cloudinary URL is in req.file.path
    const imageUrl = req.file.path;

    // Update the user's profilePic in the database
    const user = await User.findByIdAndUpdate(
      id,
      { profilePic: imageUrl },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      error: false,
      message: "Avatar updated successfully",
      data: user,
    });
  } catch (err) {
    console.error("Error in updateAvatar controller:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


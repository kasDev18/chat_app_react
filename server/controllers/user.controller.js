import User from "../models/users.js";
export const getUsersForSidebar = async (req, res) => {
  try {
    const loginUserId = req.user
    
    const filteredUsers = await User.find({ _id: { $ne: loginUserId } })
      .select("-password")
      .sort({
        updatedAt: -1,
      });

    res.status(201).json(filteredUsers);
  } catch (err) {
    console.log("Error in getUsers controller", err.message);
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
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      error: false,
      message: "Avatar updated successfully",
      data: user,
    });
  } catch (err) {
    console.log("Error in updateAvatar controller", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


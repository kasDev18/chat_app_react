import User from "../models/users.js";

const { CLIENT_URL } = process.env;

export const getUsersForSidebar = async (req, res) => {
  try {
    const loginUserId = req.user;
    // const loginUserId = req.user._id;

    // console.log(loginUserId);

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

    if(!req.file) return res.status(400).json({ error: "No file provided" });

    res.status(201).json({
      error: false,
      message: "Avatar updated successfully",
    });

  } catch (err) {
    console.log("Error in updateAvatar controller", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


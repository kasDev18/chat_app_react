import User from "../models/users.js";

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
    const ALLOWED_FORMATS = ["image/jpeg", "image/png", "image/jpg"]; // Allowed MIME types

    if (!ALLOWED_FORMATS.includes(req.file.mimetype)) {
      res.status(406).json({ error: "Invalid file type. Only JPEG, PNG, and JPG files are allowed." });
      return;
    }
    
    const profilePic = req.file;
    // console.log(profilePic);
    
    
    
    // const user = await User.findById(id);
    // user.profilePic = profilePic;
    // await user.save();

    // const user = await User.findById(id);
    // user.profilePic = profilePic;
    // await user.save();

    // res.status(201).json(user);
  } catch (err) {
    console.log("Error in updateAvatar controller", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

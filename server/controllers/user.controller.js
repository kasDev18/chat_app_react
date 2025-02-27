import User from "../models/users.js";

export const getUsersForSidebar = async (req, res) => {
    try {
        const loginUserId = req.user;
        // const loginUserId = req.user._id;

        // console.log(loginUserId);
        

        const filteredUsers =   await User.find({ _id: { $ne: loginUserId } }).select("-password");

        res.status(201).json(filteredUsers);
    } catch (err) {
        console.log("Error in getUsers controller", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
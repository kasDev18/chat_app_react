import jwt from "jsonwebtoken";

import User from "../models/users.js";

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        // console.log(token);
        

        if(!token) return res.status(401).json({ error: "Unauthorized - No Token Provided" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        if(!decoded) return res.status(401).json({ error: "Unauthorized - Invalid Token" });

        // console.log(decoded);

        const user = await User.findById(decoded.userId).select("-password");

        if(!user) return res.status(401).json({ error: "User not found" });

        // console.log(user);
        
        req.user = user;
        
        next();
    } catch (err) {
        console.log("Error in protectRoute middleware", err.message);
        res.status(401).json({ error: "Internal Server Error" });
    }
};

export default protectRoute;
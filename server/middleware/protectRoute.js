import jwt from "jsonwebtoken";
import User from "../models/users.js";
import { jwtConfig, isDevelopment } from "../config/env.js";

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ 
                error: "Unauthorized - No Token Provided" 
            });
        }

        const decoded = jwt.verify(token, jwtConfig.secret);
        
        if (!decoded) {
            return res.status(401).json({ 
                error: "Unauthorized - Invalid Token" 
            });
        }

        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(401).json({ 
                error: "User not found" 
            });
        }
        
        req.user = user;
        next();
        
    } catch (err) {
        if (isDevelopment()) {
            console.error("🔒 Error in protectRoute middleware:", err.message);
        }
        
        res.status(401).json({ 
            error: "Unauthorized - Invalid Token" 
        });
    }
};

export default protectRoute;
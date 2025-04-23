import jwt from "jsonwebtoken";
import redisClient from "../services/redisService.js";


export const authuser = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Access denied. No token provided." });
        }


        const isBlackListed = await redisClient.get(token)
        
        if (isBlackListed) {
            res.clearCookie("token");
            return res.status(401).json({ message: "Access denied. Token has been blacklisted" })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);        
        if (!decoded) {
            res.clearCookie("token");
            return res.status(401).json({ message: "Access denied. Invalid token." });
        }
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error)
        res.clearCookie("token");
        return res.status(401).json({ msg: "Not authorized" });
    }
}
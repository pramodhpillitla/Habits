import jwt from "jsonwebtoken";
import { getJwtSecret } from "../config/auth.js";
import User from "../models/user.model.js";
import TokenBlacklist from "../models/tokenBlacklist.model.js";

const getToken = (req) => {
  return req.cookies?.token;
};

export const protect = async (req, res, next) => {
  try {
    const token = getToken(req);
    if (!token) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const isBlacklisted = await TokenBlacklist.findOne({ token });
    if (isBlacklisted) {
      return res.status(401).json({ message: "Invalid session" });
    }

    const decoded = jwt.verify(token, getJwtSecret());
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "Invalid session" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired session" });
  }
};

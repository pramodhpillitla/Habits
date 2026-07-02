import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getJwtSecret } from "../config/auth.js";
import User from "../models/user.model.js";
import TokenBlacklist from "../models/tokenBlacklist.model.js";

const signToken = (userId) =>
  jwt.sign({ id: userId }, getJwtSecret(), {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });

const publicUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
});

const setAuthCookie = (res, token) => {
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name?.trim() || !email?.trim() || !password) {
    return res.status(400).json({ message: "Name, email, and password are required" });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters" });
  }

  const existingUser = await User.findOne({ email: email.trim().toLowerCase() });
  if (existingUser) {
    return res.status(409).json({ message: "An account with this email already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await User.create({
    name: name.trim(),
    email: email.trim().toLowerCase(),
    password: hashedPassword,
  });

  const token = signToken(user._id);
  setAuthCookie(res, token);

  return res.status(201).json({ user: publicUser(user) });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email?.trim() || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const user = await User.findOne({ email: email.trim().toLowerCase() });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = signToken(user._id);
  setAuthCookie(res, token);

  return res.json({ user: publicUser(user) });
};

export const logout = async (req, res) => {
  const token = req.cookies.token;
  if (token) {
    try {
      await TokenBlacklist.create({ token });
    } catch (err) {
      // Ignore duplicate key errors if already blacklisted
    }
  }
  res.clearCookie("token");
  return res.json({ message: "Logged out" });
};

export const me = (req, res) => res.json({ user: publicUser(req.user) });

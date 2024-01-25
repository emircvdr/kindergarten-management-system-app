import User from "../models/userModels/user.js";
import Token from "../models/authModels/token.js";
import RefreshToken from "../models/authModels/refreshToken.js";
import jwt from "jsonwebtoken";
import { hashPassword, comparePassword } from "../helpers/auth.js";

export const register = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    if (!userName) {
      return res.json({ error: "Ad ve soyad girin" });
    }
    if (!password || password.length < 6) {
      return res.json({
        error: "Sifreyi dogru girin ve 6 karakterden uzun girin",
      });
    }
    if (!email) {
      return res.json({ error: "Email adresi girin" });
    }
    const exist = await User.findOne({ email });
    if (exist) {
      return res.json({ error: "Bu email adresi kullaniliyor" });
    }

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      userName,
      email,
      password: hashedPassword,
    });
    return res.json({ message: "Kayit basarili" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({ error: "Email ya da şifre hatalı" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Email ya da şifre hatalı" });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(401).json({ error: "Email ya da şifre hatalı" });
    }

    const dbToken = await Token.findOne({ userId: user._id });
    if (dbToken) {
      await Token.findByIdAndDelete(dbToken._id);
    }
    const dbRefreshToken = await RefreshToken.findOne({ userId: user._id });
    if (dbRefreshToken) {
      await RefreshToken.findByIdAndDelete(dbRefreshToken._id);
    }

    const token = jwt.sign(
      {
        _id: user._id,
        userName: user.userName,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    const refreshToken = jwt.sign(
      {
        _id: user._id,
        userName: user.userName,
        email: user.email,
      },
      process.env.JWT_SECRET_REFRESH,
      { expiresIn: "7d" }
    );
    await Token.create({
      token,
      userId: user._id,
      expiredAt: Date.now() + 24 * 60 * 60 * 1000,
    });
    await RefreshToken.create({
      token: refreshToken,
      userId: user._id,
      expiredAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
    });
    res.json({
      _id: user._id,
      userName: user.userName,
      email: user.email,
      token,
      refreshToken,
    });
  } catch (error) {
    console.log(error);
  }
};

export const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET_REFRESH);

    const dbRefreshToken = await RefreshToken.findOne({
      userId: decoded._id,
      token: refreshToken,
    });
    if (!dbRefreshToken) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    if (Date.now() > dbRefreshToken.expiredAt) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const dbToken = await Token.findOne({ userId: decoded._id });
    if (dbToken) {
      await Token.findByIdAndDelete(dbToken._id);
    }
    await RefreshToken.findByIdAndDelete(dbRefreshToken._id);

    const token = jwt.sign(
      {
        _id: decoded._id,
        userName: decoded.userName,
        email: decoded.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    await Token.create({
      token,
      userId: decoded._id,
      expiredAt: Date.now() + 24 * 60 * 60 * 1000,
    });
    const newRefreshToken = jwt.sign(
      {
        _id: decoded._id,
        userName: decoded.userName,
        email: decoded.email,
      },
      process.env.JWT_SECRET_REFRESH,
      { expiresIn: "7d" }
    );
    await RefreshToken.create({
      token: newRefreshToken,
      userId: decoded._id,
      expiredAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      token,
      refreshToken: newRefreshToken,
    });
  } catch (error) {
    console.log(error);
  }
};

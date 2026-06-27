import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { User } from "../Models/userModel.js";
import jwt from "jsonwebtoken";

export const register = async(req,res)=>{
  try {
    const { fullName, userName, password, confirmPassword, gender } = req.body;

    if(!fullName || !userName || !password || !confirmPassword || !gender){
      return res.status(400).json({message:"Fields cannot be empty"});
    }

    if(password !== confirmPassword){
      return res.status(400).json({message:"Passwords do not match"});
    }

    const user = await User.findOne({ userName });
    if(user){
      return res.status(400).json({message:"User already exists"});
    }

    const hashPassword = await bcrypt.hash(password,10);
    const userAvatar = `https://api.dicebear.com/10.x/initials/svg?seed=${userName}`;

    await User.create({
      fullName,
      userName,
      password:hashPassword,
      profilePhoto:userAvatar,
      gender
    });

      return res.status(201).json({
      success: true,
      message: "User registered successfully",
   
    });
  } catch (error) {
    res.status(500).json({message:"Server error", error:error.message});
  }
};

export const login = async (req, res) => {
  try {
    const { userName, password } = req.body;

    // Validate input
    if (!userName || !password) {
      return res.status(400).json({ message: "Fields cannot be empty", success: false });
    }

    // Find user
    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(400).json({ message: "Incorrect username or password", success: false });
    }

    // Compare password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Incorrect username or password", success: false });
    }

    // Create token
    const tokenData = { userId: user._id };
    const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });

    // Send response with cookie
    return res.status(200)
      .cookie("token", token, {
  maxAge: 24 * 60 * 60 * 1000, // 1 day
  httpOnly: true,
  sameSite: "lax",   // ✅ allows cross-port cookies
  secure: false      // keep false for localhost (true only with HTTPS)
})
      .json({
        _id: user._id,
        userName: user.userName,
        fullName: user.fullName,
        profilePhoto: user.profilePhoto,
        success: true
      });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

export const logout = (req, res) => {
  try {
    // Clear cookie properly
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "lax"
    });

    return res.status(200).json({
      message: "Logged out successfully",
      success: true
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error during logout",
      success: false
    });
  }
};




export const getOtherUser = async (req, res) => {
  try {
    const loggedInUserId = req.userId;

    // Convert to ObjectId for comparison
    const loggedInObjectId = new mongoose.Types.ObjectId(loggedInUserId);

    const allUsers = await User.find().select("-password");

    const self = allUsers.find(u => u._id.equals(loggedInObjectId));
    const others = allUsers.filter(u => !u._id.equals(loggedInObjectId));

    return res.status(200).json({ self, others });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};


 



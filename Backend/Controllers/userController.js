import bcrypt from "bcryptjs";
import { User } from "../Models/userModel.js";

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

    res.status(201).json({message:"User registered successfully"});
  } catch (error) {
    res.status(500).json({message:"Server error", error:error.message});
  }
};



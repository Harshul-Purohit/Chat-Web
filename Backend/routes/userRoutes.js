import express from "express";
import { register,login,logout,getOtherUser} from "../Controllers/userController.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

// router.route("/register").post(register);
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/",isAuthenticated,getOtherUser)
export default router; 

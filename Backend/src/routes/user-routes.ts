import { Router } from "express";
import {
  getAllUsers,
  userSignup,
  userLogin,
} from "../controllers/user-controllers.js";
import { verifyToken } from "../utils/token-manager.js";
import {
  validate,
  signupValidator,
  loginValidator,
} from "../utils/validators.js";

const userRoutes = Router();
userRoutes.get("/", getAllUsers);
userRoutes.post("/signup", validate(signupValidator), userSignup);
userRoutes.post("/login", validate(loginValidator), userLogin);
userRoutes.get("/auth-status", verifyToken);

export default userRoutes;

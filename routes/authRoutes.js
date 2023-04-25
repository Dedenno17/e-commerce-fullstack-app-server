import express from "express";
import {
  postRegister,
  postLogin,
  postRefresh,
  getLogout,
} from "../controllers/auth.js";
import { verifyTokenAndAuthorization } from "./verifyToken.js";

const router = express.Router();

// register
router.post("/register", postRegister);

// login
router.post("/login", postLogin);

// refresh
router.post("/refresh", postRefresh);

// logout
router.post("/logout", verifyTokenAndAuthorization, getLogout);

export default router;

import express from "express";
import { postRegister, postLogin, postRefresh } from "../controllers/auth.js";

const router = express.Router();

// register
router.post("/register", postRegister);

// login
router.post("/login", postLogin);

// refresh
router.post("/refresh", postRefresh);

export default router;

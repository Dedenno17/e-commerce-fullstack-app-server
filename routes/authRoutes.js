import express from 'express';
import { postRegister, postLogin } from '../controllers/auth.js';

const router = express.Router();

// register
router.post('/register', postRegister);

// login
router.post('/login', postLogin);

export default router;

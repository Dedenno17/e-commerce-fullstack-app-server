import CryptoJS from 'crypto-js';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

// register
export const postRegister = async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// login
export const postLogin = async (req, res) => {
  try {
    const user = await User.find({ username: req.body.username });

    // CHECK IF USERNAME WAS THERE
    if (!user) {
      res.status(401).json('Wrong Credentials!');
      return;
    }

    // CHECK IF PASS WAS RIGHT
    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );
    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    if (originalPassword !== req.body.password) {
      res.status(401).json('Wrong Credentials!');
      return;
    }

    // CREATE ACCES TOKEN
    const accesToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.PASS_SEC,
      { expiresIn: '3d' }
    );

    // DESTRUCTUR PASSWORD
    const { password, ...others } = user._doc;

    res.status(201).json({ others, accesToken });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

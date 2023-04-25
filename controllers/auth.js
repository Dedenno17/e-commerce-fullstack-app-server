import CryptoJS from "crypto-js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

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

    // CREATE ACCES TOKEN
    const accesToken = jwt.sign(
      {
        id: savedUser._id,
        isAdmin: savedUser.isAdmin,
      },
      process.env.PASS_SEC,
      { expiresIn: "3d" }
    );

    // DESTRUCTUR PASSWORD
    const { password, ...others } = savedUser._doc;

    res.status(201).json({ others, accesToken });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// login
export const postLogin = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    // CHECK IF USERNAME WAS THERE
    if (!user) {
      res.status(401).json("Wrong Username!");
      return;
    }

    // CHECK IF PASS WAS RIGHT
    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );
    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    if (originalPassword !== req.body.password) {
      res.status(401).json("Wrong Password!");
      return;
    }

    // CREATE ACCES TOKEN
    const accesToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.PASS_SEC,
      { expiresIn: "3d" }
    );

    // DESTRUCTUR PASSWORD
    const { password, ...others } = user._doc;

    res.status(201).json({ others, accesToken });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// refresh Token and verify it
export const postRefresh = (req, res) => {
  const token = req.body.token;
  if (!token) {
    return res.status(401).json({ message: "Token tidak tersedia" });
  }

  // Verify token menggunakan secret key yang sama saat pembuatan token
  jwt.verify(token, process.env.JWT_SEC, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Token tidak valid" });
    }

    // Jika token valid, kembalikan data user dari token
    const userDataDecoded = decoded;

    // find the user data
    const userData = await User.findById(userDataDecoded.id);

    // CREATE ACCES TOKEN
    const accesToken = jwt.sign(
      {
        id: userData._id,
        isAdmin: userData.isAdmin,
      },
      process.env.PASS_SEC,
      { expiresIn: "3d" }
    );

    // DESTRUCTUR PASSWORD
    const { password, ...others } = userData._doc;

    res.status(201).json({ others, accesToken });
  });
};

// logout
export const getLogout = async (req, res) => {
  // Clear the user's session data and redirect to the login page
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json("Destroy");
      res.redirect("/login");
    }
  });
};

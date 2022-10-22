import bcrypt from "bcrypt";
import generateToken from "../helpers/authenticationHelper.js";
import User from "../models/user.js";

export const registerUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 11);
  try {
    const userExists = await User.findOne({ email: email });
    if (userExists) {
      return res.status(409).json({ message: "User is already registered!" });
    }
    const createdUser = await User.create({
      firstName,
      lastName,
      email,
      ip: req.ip,
      password: hashedPassword,
    });
    return res.status(201).json({ message: "User created", createdUser });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide email and password" });
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return statusbar(400).json({ message: "No user found" });
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    if (checkPassword) {
      const token = await generateToken(user);
      return res
        .status(200)
        .cookie("jwt", token, {
          httpOnly: true,
          secure: false,
          sameSite: false,
        })
        .json({ message: "You are authenticated, Welcome" });
    } else {
      return res.status(400).json({ message: "No access granted" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find();
    return res.status(200).json(allUsers);
  } catch (error) {
    return res.send(error.message);
  }
};

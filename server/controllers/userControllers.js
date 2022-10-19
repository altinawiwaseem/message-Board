import bcrypt from "bcrypt";
import generateToken from "../helpers/authenticationHelper.js";
import User from "../models/User.js";

export const registerUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 11);
  try {
    const userExists = await User.findOne({ email: email });
    if (userExists) {
      return res
        .status(409)
        .json({ message: "User is already registered!!, Please Login" });
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

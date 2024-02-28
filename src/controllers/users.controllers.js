import asyncHandler from "express-async-handler";
import userModel from "../models/users.models.js";
import bcrypt from "bcryptjs";
import generateToken from "../middleware/generateToken.js";

export const registerController = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!email || !password || !name) {
    res.status(400);
    throw new Error("Please add all fields ");
  }

  // check if user exists
  const userExists = await userModel.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // now hash the password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const user = await userModel.create({ name, email, password: hashPassword });

  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

export const loginController = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Please add all fields ");
  }

  // check for user email
  const user = await userModel.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

export const getCurrentUserController = asyncHandler(async (req, res, next) => {
  const { _id, name, email } = await userModel.findById(req.user._id);
  console.log(_id, name, email);
  res.status(200).json({
    id: _id,
    name,
    email,
  });
});

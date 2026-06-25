import { asyncHandler } from "../utils/asyncHandler.js";
import {
  registerUser,
  loginUser,
  verifyEmailByToken,
} from "../services/authService.js";

export const register = asyncHandler(async (req, res) => {
  const result = await registerUser(req.body);

  res.status(201).json({
    message: "Registration successful",
    ...result,
  });
});

export const login = asyncHandler(async (req, res) => {
  const result = await loginUser(req.body);

  res.status(200).json({
    message: "Login successful",
    ...result,
  });
});

export const verifyEmail = asyncHandler(async (req, res) => {
  const user = await verifyEmailByToken(req.query.token);

  res.status(200).json({
    message: "Email verified successfully",
    user,
  });
});
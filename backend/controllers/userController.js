import { asyncHandler } from "../utils/asyncHandler.js";
import {
  getUsers,
  blockUsers,
  unBlockUsers,
  deleteUsers,
  deleteUnverified,
} from "../services/userService.js";

export const getUsersList = asyncHandler(async (req, res) => {
  const users = await getUsers();

  res.status(200).json({
    users,
  });
});

export const blockSelectedUsers = asyncHandler(async (req, res) => {
  await blockUsers(req.body.ids);

  res.status(200).json({
    message: "Users blocked successfully",
  });
});

export const unBlockSelectedUsers = asyncHandler(async (req, res) => {
  await unBlockUsers(req.body.ids);

  res.status(200).json({
    message: "Users unblocked successfully",
  });
});

export const deleteSelectedUsers = asyncHandler(async (req, res) => {
  await deleteUsers(req.body.ids);

  res.status(200).json({
    message: "Users deleted successfully",
  });
});

export const deleteUnverifiedUsersController = asyncHandler(
  async (req, res) => {
    await deleteUnverified();

    res.status(200).json({
      message: "Unverified users deleted successfully",
    });
  }
);
import {
  getAllUsers,
  blockUsersByIds,
  unBlockUsersByIds,
  deleteUsersByIds,
  deleteUnverifiedUsers,
} from "../repositories/userRepository.js";

export const getUsers = async () => getAllUsers();

export const blockUsers = async (ids) => {
  await blockUsersByIds(ids);
};

export const unBlockUsers = async (ids) => {
  await unBlockUsersByIds(ids);
};

export const deleteUsers = async (ids) => {
  await deleteUsersByIds(ids);
};

export const deleteUnverified = async () => {
  await deleteUnverifiedUsers();
};
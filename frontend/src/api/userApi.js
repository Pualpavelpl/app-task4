import { api } from "./httpClient";

export const getUsers = async () => {
  const response = await api.get("/users");

  return response.data.users;
};

export const blockUsers = async (ids) => {
  const response = await api.patch("/users/block", { ids });

  return response.data;
};

export const unblockUsers = async (ids) => {
  const response = await api.patch("/users/unblock", { ids });

  return response.data;
};

export const deleteUsers = async (ids) => {
  const response = await api.delete("/users", {
    data: { ids },
  });

  return response.data;
};

export const deleteUnverifiedUsers = async () => {
  const response = await api.delete("/users/unverified");

  return response.data;
};
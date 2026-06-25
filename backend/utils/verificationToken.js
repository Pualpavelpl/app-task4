import crypto from "crypto";

export const createVerificationToken = () => {
  return crypto.randomBytes(32).toString("hex");
};

export const getVerificationTokenExpiresAt = () => {
  const date = new Date();

  date.setHours(date.getHours() + 24);

  return date;
};
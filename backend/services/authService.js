import {
  createUser,
  findUserByEmail,
  updateLastLogin,
  verifyUserEmailByToken,
} from "../repositories/userRepository.js";

import {
  hashPassword,
  comparePassword,
} from "../utils/password.js";

import { generateToken } from "../utils/jwt.js";

import {
  createVerificationToken,
  getVerificationTokenExpiresAt,
} from "../utils/verificationToken.js";

import { AppError } from "../utils/AppError.js";


export const registerUser = async ({ name, email, password }) => {
  const passwordHash = await hashPassword(password);
  const verificationToken = createVerificationToken();
  const verificationTokenExpiresAt = getVerificationTokenExpiresAt();

  const user = await createUser({
    name,
    email,
    passwordHash,
    verificationToken,
    verificationTokenExpiresAt,
  });

  const token = generateToken(user.id);

return {
  token,
  user,
  verificationLink: `${process.env.CLIENT_URL}/verify-email?token=${verificationToken}`,
};
};

export const loginUser = async ({ email, password }) => {
  const user = await findUserByEmail(email);
  

  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  if (user.is_blocked) {
    throw new AppError("User is blocked", 403);
  }

  const isPasswordValid = await comparePassword(password, user.password_hash);

  if (!isPasswordValid) {
    throw new AppError("Invalid email or password", 401);
  }
  await updateLastLogin(user.id);
  const token = generateToken(user.id);
  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      emailStatus: user.email_status,
      isBlocked: user.is_blocked,
    },
  };
};
export const verifyEmailByToken = async (token) => {
  if (!token) {
    throw new AppError("Verification token is required", 400);
  }

  const user = await verifyUserEmailByToken(token);

  if (!user) {
    throw new AppError("Invalid or expired verification token", 400);
  }

  const jwtToken = generateToken(user.id);

  return {
    token: jwtToken,
    user
  };
};

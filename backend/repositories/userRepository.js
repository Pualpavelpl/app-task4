import pool from "../db.js";


export const createUser = async ({
  name,
  email,
  passwordHash,
  verificationToken,
  verificationTokenExpiresAt,
}) => {
  const query = `
    INSERT INTO users (
      name,
      email,
      password_hash,
      verification_token,
      verification_token_expires_at
    )
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id, name, email, email_status, is_blocked, created_at
  `;

  const values = [
    name,
    email,
    passwordHash,
    verificationToken,
    verificationTokenExpiresAt,
  ];

  const result = await pool.query(query, values);

  return result.rows[0];
};

export const findUserByEmail = async (email) => {
  const query = `SELECT id,  name,  email, password_hash,  email_status,  is_blocked
    FROM users WHERE email = $1`;

  const result = await pool.query(query, [email]);

  return result.rows[0];
};

export const updateLastLogin = async (userId) => {
  const query = `UPDATE users
  SET last_login_at = NOW()
  WHERE id = $1`;
  const values = [userId];
  await pool.query(query, values);
};

export const findUserById = async (userId) => {
  const query = `SELECT id, name,  email, email_status, is_blocked
    FROM users WHERE id = $1 `;

  const values = [userId];

  const result = await pool.query(query, values);

  return result.rows[0];
};

export const getAllUsers = async () => {
  const query = `
    SELECT id, name, email, email_status, is_blocked, created_at, last_login_at, last_seen_at
    FROM users
    ORDER BY last_login_at DESC NULLS LAST, created_at DESC`;

  const result = await pool.query(query);

  return result.rows;
};

export const blockUsersByIds = async (ids) => {
  const query = `UPDATE users
    SET is_blocked = TRUE
    WHERE id = ANY($1::int[])`;

  const values = [ids];

  await pool.query(query, values);
};

export const unBlockUsersByIds = async (ids) => {
  const query = `UPDATE users
    SET is_blocked = FALSE
    WHERE id = ANY($1::int[])`;

  const values = [ids];

  await pool.query(query, values);
};

export const deleteUsersByIds = async (ids) => {
  const query = `DELETE FROM users
    WHERE id = ANY($1::int[])`;

  const values = [ids];

  await pool.query(query, values);
};

export const deleteUnverifiedUsers = async () => {
  const query = `DELETE FROM users
    WHERE email_status = 'unverified'`;

  await pool.query(query);
};

export const verifyUserEmailByToken = async (token) => {
  const query = `
    UPDATE users
    SET
      email_status = 'active',
      verification_token = NULL,
      verification_token_expires_at = NULL
      WHERE verification_token = $1
    RETURNING id, name, email, email_status, is_blocked
  `;

  const result = await pool.query(query, [token]);

  return result.rows[0];
};

const { promisify } = require('util');
const db = require('../models');
const bcrypt = require('bcryptjs');
const AppError = require('../utils/appError');
const jwt = require('jsonwebtoken');

// create main model
const User = db.users;

/**
 * Signs up a new user.
 *
 * @param {Object} data - User data including name, email, image, and password
 * @param {string} data.email - User's email address.
 * @param {string} data.password - User's password.
 * @param {string} data.image - User's email image.
 * @param {string} data.name - User's name.
 * @returns {Promise<Object>} A promise that resolves to the created user object.
 * @throws {AppError} If the user already exists or if there's an error during user creation.
 */
exports.signup = async ({ name, email, image, password }) => {
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw new AppError('This user already exists', 400);
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  return await User.create({
    name,
    email,
    image,
    password: hashedPassword,
  });
};


/**
 * Authenticate a user with email and password.
 *
 * @param {Object} credentials - User credentials for login.
 * @param {string} credentials.email - User's email address.
 * @param {string} credentials.password - User's password.
 * @throws {AppError} If the user is not found or if the provided password is incorrect.
 * @returns {Promise<Object>} A promise that resolves to the authenticated user object.
 */
exports.login = async ({ email, password }) => {
  // Check if a user with the provided email exists in the database
  const validUser = await User.findOne({ where: { email } });

  // If no user is found, throw an error indicating that the user was not found
  if (!validUser) {
    throw new AppError('User not found', 401);
  }

  // Compare the provided password with the hashed password stored in the database
  const match = await bcrypt.compare(password, validUser.password);

  // If the passwords do not match, throw an error indicating wrong credentials
  if (!match) {
    throw new AppError('Wrong credentials', 401);
  }

  // If the passwords match, return the valid user object
  return validUser;
};


/**
 * Protects a route by verifying the user's token.
 *
 * @param {Request} req - The request object containing headers.
 * @returns {Promise<Object>} A promise that resolves to the user object.
 * @throws {AppError} If the user is not authenticated or no longer exists.
 */
exports.protect = async (req) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    throw new AppError('Log in to get access', 401);
  }

  // Verification of the token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // Check if the user still exists
  const user = await User.findByPk(decoded.id);

  if (!user) {
    throw new AppError('This user no longer exists', 401);
  }

  return user;
};



/**
 * Sends a reset password email.
 */
exports.forgetPassword = async () => {};

/**
 * Resets a user's password.
 */
exports.resetPassword = async () => {};

/**
 * Updates the password of the currently logged-in user.
 */
exports.updatePassword = async () => {};

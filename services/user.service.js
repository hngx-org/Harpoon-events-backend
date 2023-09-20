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
 * @param {Object} data - User data including name, email, image, and password.
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
 * Log in user
 *
 * @param {Object} data - User data including email, password, thirdPartyToken.
 * @returns {Promise<Object>} A promise that resolves to the user object.
 * @throws {AppError} If the user is not authenticated or no longer exists.
 */
exports.login = async ({ email, password, thirdPartyToken }) => {
  // if (thirdPartyToken) {
  //   // Handle third-party authentication here
  //   // Example: Verify and decode the third-party token and retrieve user information
  //   // You can use a library like `jsonwebtoken` to decode the token
  //   const decodedToken = jwt.decode(thirdPartyToken);

  //   // Check if the third-party token is valid and contains user information
  //   if (decodedToken) {
  //     // You may also check the expiration, issuer, or other claims in the decoded token
  //     // Retrieve user information from the decoded token
  //     const {  name, email, image } = decodedToken;

  //     // Check if the user with the provided email exists in your database
  //     const user = await User.findOne({ where: { email } });

  //     if (!user) {
  //       // If the user doesn't exist, create a new user based on the third-party token information
  //       await User.create({
  //         // Assuming the ID is provided automatically by the database
  //         name,
  //         email,
  //         image,
  //         // You may also set a default password or other user attributes here
  //       });

  //       // Create a JWT token for the user
  //       const token = jwt.sign({ id }, process.env.JWT_SECRET, {
  //         expiresIn: '1h',
  //       });

  //       // Return the user data (excluding the password) and the JWT token
  //       return {
  //         user: { id, name, email, image },
  //         token,
  //       };
  //     } else {
  //       // If the user already exists, create a JWT token for the existing user
  //       const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
  //         expiresIn: '1h',
  //       });

  //       // Return the user data (excluding the password) and the JWT token
  //       return {
  //         user: {
  //           id: user.id,
  //           name: user.name,
  //           email: user.email,
  //           image: user.image,
  //         },
  //         token,
  //       };
  //     }
  //   }
  // }

  // // If no third-party token is provided or the token is invalid, fallback to email/password authentication
  // const user = await User.findOne({ where: { email } });

  // if (!user || !(await bcrypt.compare(password, user.password))) {
  //   throw new AppError('Invalid email or password', 401);
  // }

  // // Create a JWT token for the authenticated user
  // const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
  //   expiresIn: '1h',
  // });

  // // Return the user data (excluding the password) and the JWT token
  // return {
  //   user: { id: user.id, name: user.name, email: user.email, image: user.image },
  //   token,
  // };
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

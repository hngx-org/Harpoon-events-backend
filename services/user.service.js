const db = require('../models');
const bcrypt = require('bcryptjs');
const AppError = require('../utils/appError');

// gets the interested event model instance
const InterestedEvent = db.interestedEvents;

// Get the user model instance
const UserModel = db.users;

// create main model
module.exports.UserModel = db.users;

exports.signup = async ({ name, email, image, password }) => {
  const existingUser = await UserModel.findOne({ where: { email } });
  if (existingUser) {
    throw new AppError('This user already exists', 400);
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  return await UserModel.create({
    name,
    email,
    image,
    password: hashedPassword,
  });
};

exports.login = async ({ email, password }) => {
  // Check if a user with the provided email exists in the database
  const validUser = await UserModel.findOne({ where: { email } });

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

exports.Google = async ({ name, email, image }) => {
  const user = await UserModel.findOne({ where: { email } });
  if (!user) {
    return await UserModel.create({
      name,
      email,
      image,
    });
  } else {
    return user;
  }
};

exports.Twitter = async ({ name, email, image }) => {
  const user = await UserModel.findOne({ where: { email } });
  if (!user) {
    return await UserModel.create({
      name,
      email,
      image,
    });
  } else {
    return user;
  }
};

/**
 * Updates user by their ID.
 *
 * @param {string} userId - The ID of the user to update.
 * @param {object} req - The request object containing updated user details.
 * @param {string} req.body.name - The updated name of the user.
 * @param {string} req.body.email - The updated email of the user.
 * @param {string} req.body.image - The updated image of the user.
 * @returns {Promise<Object|null>} A promise that resolves to the updated event object or null if not found.
 * @throws {AppError} If the event is not found or the user doesn't have access to update the event.
 */
exports.updateUser = async (userId, req) => {
  const user = await UserModel.findByPk(userId);

  if (!user) {
    throw new AppError('User not found', 404);
  }

  // Get the updated info from the body of the request
  const updatedInfo = {
    name: req.body.name,
    email: req.body.email,
    image: req.body.image,
  };

  // Update the details of the user
  await UserModel.update(updatedInfo, {
    where: { id: userId },
  });

  // Then return the user details with updated info
  return await UserModel.findByPk(userId);
};

/**
 * Get user details by their ID.
 *
 * @param {string} userId - The ID of the user to update.
 * @returns {Promise<Object|null>} A promise that resolves to the retrieved event object or null if not found.
 * @throws {AppError} If the event is not found.
 */

exports.getUser = async (userId) => {
  const user = await UserModel.findByPk(userId);

  if (!user) {
    throw new AppError('User not found', 404);
  }

  return user;
};

// express interest in an event
exports.interestedEvent = async (params) => {
  const interested = await InterestedEvent.create({
    user_id: params.user_id,
    event_id: params.event_id,
  });

  if (interested) {
    return interested;
  }
  throw new AppError('interest in event not created successfully', 400);
};

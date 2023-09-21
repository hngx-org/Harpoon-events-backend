const db = require('../models');
const bcrypt = require('bcryptjs');
const AppError = require('../utils/appError');

// create main model

const InterestedEvent = db.interestedEvents;

const UserModel = db.users;

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

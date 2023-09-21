const { promisify } = require('util');
const db = require('../models');
const bcrypt = require('bcryptjs');
const AppError = require('../utils/appError');
const jwt = require('jsonwebtoken');

// create main model
const User = db.users;
<<<<<<< HEAD
const InterestedEvent = db.interestedEvents;
=======
>>>>>>> d44cd122e796626ade556fdb5793081947d13b40

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

exports.Google = async ({ name, email, image }) => {
<<<<<<< HEAD
  const User = await User.findOne({ where: { email } });
  if (!User) {
    throw new AppError('user not found', 401);
  } else if (User) {
    return User;
  } else {
=======
  const user = await User.findOne({ where: { email } });
  if (!user) {
>>>>>>> d44cd122e796626ade556fdb5793081947d13b40
    return await User.create({
      name,
      email,
      image,
    });
<<<<<<< HEAD
  }
};

exports.Twitter = async ({ name, email, image }) => {
  const User = await User.findOne({ where: { email } });
  if (!User) {
    throw new AppError('user not found', 401);
  } else if (User) {
    return User;
=======
>>>>>>> d44cd122e796626ade556fdb5793081947d13b40
  } else {
    return user;
  }
};

exports.protect = async (req) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  //validate token
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
<<<<<<< HEAD

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
=======
>>>>>>> d44cd122e796626ade556fdb5793081947d13b40

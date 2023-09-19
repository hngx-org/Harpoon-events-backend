const { promisify } = require('util');
const db = require('../models');
const bcrypt = require('bcryptjs');
const AppError = require('../utils/appError');
const jwt = require('jsonwebtoken');

// create meain model
const User = db.users;

//SIGN UP CONTROLLER
exports.signup = async ({ name, email, image, password }) => {
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw new AppError('This user already exist', 400);
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  return await User.create({
    name,
    email,
    image,
    password: hashedPassword,
  });
};

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

  // verification of the token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // Check if user still exist
  const user = await User.findByPk(decoded.id);

  if (!user) {
    throw new AppError('This user no longer exist', 401);
  }

  return user;
};

// LOGIN CONTROLLER
exports.login = () => {};

exports.forgetPassword = async () => {};

exports.resetPassword = async () => {};

// update password of password that is logged in
exports.updatePassword = async () => {};

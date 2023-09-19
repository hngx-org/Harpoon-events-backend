const db = require('../models');
const bcrypt = require('bcryptjs');
const AppError = require('../utils/appError');

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

// LOGIN CONTROLLER
exports.login = () => {};

exports.forgetPassword = async () => {};

exports.resetPassword = async () => {};

// update password of password that is logged in
exports.updatePassword = async () => {};

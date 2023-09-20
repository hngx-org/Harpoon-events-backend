const db = require('../models');
const jwt = require('jsonwebtoken');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const UserService = require('./../services/user.service');

const { signupValidationSchema } = require('../validations');

//SIGN UP CONTROLLER
exports.signup = catchAsync(async (req, res, next) => {
  try {
    const data = await signupValidationSchema.validateAsync({ ...req.body });

    const user = await UserService.signup(data);

    if (!user) {
      return next(new AppError('User not created successfully', 400));
    }

    res.status(201).json({
      status: 'success',
      user,
    });
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
});

// LOGIN CONTROLLER
exports.login = catchAsync(async (req, res, next) => {});

exports.protect = catchAsync(async (req, res, next) => {
  // getting the token and check if it exist
  const user = await UserService.protect(req);
  req.user = user;
  next();
});

exports.restricto = (...roles) => catchAsync(async (req, res, next) => {});

exports.forgetPassword = catchAsync(async (req, res, next) => {});

exports.resetPassword = catchAsync(async (req, res, next) => {});

// update password of password that is logged in
exports.updatePassword = catchAsync(async (req, res, next) => {});

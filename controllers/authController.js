const db = require('../models');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const UserService = require('./../services/user.service');

//SIGN UP CONTROLLER
exports.signup = catchAsync(async (req, res, next) => {
  const user = await UserService.signup({
    name: req.body.name,
    email: req.body.email,
    image: req.body.image,
    password: req.body.password,
  });

  if (!user) {
    return next(new AppError('User not created successfully', 400));
  }

  res.status(201).json({
    status: 'success',
    user,
  });
});

// LOGIN CONTROLLER
exports.login = catchAsync(async (req, res, next) => {});

exports.protect = catchAsync(async (req, res, next) => {});

exports.restricto = (...roles) => catchAsync(async (req, res, next) => {});

exports.forgetPassword = catchAsync(async (req, res, next) => {});

exports.resetPassword = catchAsync(async (req, res, next) => {});

// update password of password that is logged in
exports.updatePassword = catchAsync(async (req, res, next) => {});

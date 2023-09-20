const db = require('../models');
const jwt = require('jsonwebtoken');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const UserService = require('./../services/user.service');
const {
  signInValidationSchema,
  signupValidationSchema,
} = require('../validations');

//SIGN UP CONTROLLER
exports.signup = catchAsync(async (req, res, next) => {
  const { name, email, image, password } =
    await signupValidationSchema.validateAsync(req.body);
  const user = await UserService.signup({
    name,
    email,
    image,
    password,
  });

    if (!user) {
      return next(new AppError('User not created successfully', 400));
    }

  res.status(201).json({
    status: 'success',
    user,
  });
});

exports.Twitter = catchAsync(async (req, res, next) => {});

exports.Google = catchAsync(async (req, res, next) => {
  const { name, email, image } = req.body;

  const User = await User.findOne({ email });
  if (User) {
    const token = jwt.sign({ id: User._id }, process.env.JWT_SECRET);

    res
      .cookie('access_token', token, {
        httpOnly: true,
        sameSite: 'None',
        secure: true,
        expiresIn: '15m',
      })
      .status(201)
      .json({ ...User, token });
  } else {
    const newUser = await User.create({
      name,
      email,
      image,
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

    res.cookie('access_token', token, {
      httpOnly: true,
      sameSite: 'None',
      secure: true,
      expiresIn: '15m',
    });

    return res.status(200).json(newUser);
  }
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = await signInValidationSchema.validateAsync(
    req.body
  );
  const user = await UserService.login({ email, password });
  if (user) {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    const { password: hashPassword, ...User } = user.dataValues;

    res.cookie('access_token', token, {
      httpOnly: true,
      sameSite: 'None',
      secure: true,
      maxAge: 30 * 60 * 1000,
    });
    return res.status(200).json({ ...User, token });
  }
});

exports.protect = catchAsync(async (req, res, next) => {
  // getting the token and check if it exist
  const user = await UserService.protect(req);
  req.user = user;
  next();
});
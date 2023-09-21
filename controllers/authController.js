const jwt = require('jsonwebtoken');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const UserService = require('./../services/user.service');
const {
  signInValidationSchema,
  signupValidationSchema,
} = require('../validations');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// signup user
exports.signup = catchAsync(async (req, res, next) => {
  const { name, email, image, password, id } =
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
  const token = signToken(user.id);

  res.cookie('access_token', token, {
    httpOnly: true,
    sameSite: 'None',
    secure: true,
    expiresIn: process.env.JWT_SECRET,
  });

  res.status(201).json({
    status: 'success',
    user,
    token,
  });
});

//login user
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = await signInValidationSchema.validateAsync(
    req.body
  );
  const user = await UserService.login({ email, password });
  if (user) {
    const token = signToken(user.id);
    const { password: hashPassword, ...User } = user.dataValues;

    res.cookie('access_token', token, {
      httpOnly: true,
      sameSite: 'None',
      secure: true,
      expiresIn: process.env.JWT_SECRET,
    });
    return res.status(200).json({ ...User, token });
  }
});

//  signup/login with twitter
exports.Twitter = catchAsync(async (req, res, next) => {
  const { name, email, image } = req.body;

  const user = await UserService.Twitter({ name, email, image });
  if (user) {
    const token = signToken(user.id);

    res
      .cookie('access_token', token, {
        httpOnly: true,
        sameSite: 'None',
        secure: true,
        expiresIn: process.env.JWT_SECRET,
      })
      .status(201)
      .json({ ...user, token });
  }
});

// signup/login with twitter
exports.Google = catchAsync(async (req, res, next) => {
  const { name, email, image } = req.body;

  const user = await UserService.Twitter({ name, email, image });
  if (user) {
    const token = signToken(user.id);

    res
      .cookie('access_token', token, {
        httpOnly: true,
        sameSite: 'None',
        secure: true,
        expiresIn: process.env.JWT_SECRET,
      })
      .status(201)
      .json({ ...user, token });
  }
});

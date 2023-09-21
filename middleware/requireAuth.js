const jwt = require('jsonwebtoken');
const AppError = require('../utils/appError');
const {UserModel} = require('../services/user.service');
const catchAsync = require('./../utils/catchAsync');

const requireAuth = catchAsync(async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization && !authorization.startsWith('Bearer')) {
    throw new AppError('Authorization token required', 401);
  }
  const token = authorization.split(' ')[1];

  if (!token) {
    throw new AppError('Log in to get access', 401);
  }

  // Verification of the token
  const decoded = await jwt.verify(token, process.env.JWT_SECRET);
  const { id } = decoded;

  // Check if the user still exists
  req.user = await UserModel.findByPk(id);

  if (!req.user) {
    throw new AppError('This user no longer exists', 401);
  }

  next();
});

module.exports = requireAuth;

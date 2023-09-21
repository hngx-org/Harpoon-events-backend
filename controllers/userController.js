const db = require('../models');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const UserService = require('./../services/user.service');

const Event = db.events;

// update the user object except password
exports.updateUser = catchAsync(async (req, res, next) => {
  const userId = req.params.id;
  console.log(userId + 'pie');

  return res.send('pie');

  const user = await UserService.updateUser(userId, req);

  console.log(user);
  return;

  res.status(200).json({
    status: 'success!',
    user,
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  req.params.id = req.user.id;
  next();
});

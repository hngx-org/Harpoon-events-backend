const db = require('../models');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const userService = require('./../services/user.service');

const Event = db.events;

// update the user object except password
exports.updateUser = catchAsync(async (req, res, next) => {});

exports.getUser = catchAsync(async (req, res, next) => {
  req.params.id = req.user.id;
  next();
});

// express interest in an event
exports.interestedEvent = catchAsync(async (req, res, next) => {
  const params = {
    user_id: req.params.userId,
    event_id: req.params.eventId,
  };

  const interested = await userService.interestedEvent(params);
  if (!interested) {
    return next(
      new AppError('interest in event not created successfully', 400)
    );
  }

  res.status(200).json({
    status: 'sucess!',
    interested: interested,
  });
});

const db = require('../models');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const UserService = require('./../services/user.service');

const Event = db.events;

// Update user details
exports.updateUser = catchAsync(async (req, res, next) => {
   const userId = req.params.userId;

   const user = UserService.updateUser(userId, req);

   res.status(200).json({
      status: 'success!',
      user,
   });
});

// Getting the details of a user
exports.getUser = catchAsync(async (req, res, next) => {
   const userId = req.params.userId;

   const user = await UserService.getUser(userId);

   res.status(200).json({
      status: 'sucess!',
      user,
   });
});

// express interest in an event
exports.interestedEvent = catchAsync(async (req, res, next) => {
   const params = {
      user_id: req.params.userId,
      event_id: req.params.eventId,
   };

   const interested = await UserService.interestedEvent(params);
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

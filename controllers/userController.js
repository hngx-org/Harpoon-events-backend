const db = require('../models');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const UserService = require("../services/user.service");

// const Event = db.events;
// const Users = db.users;


// update the user object except password
exports.updateUser = catchAsync(async (req, res, next) => {
   const { id } = req.params;

   const user = await UserService.updateUser(id, req);

   res.status(200).json({
      status: 'success!',
      user,
   });
});

exports.getUser = catchAsync(async (req, res, next) => {
   req.params.id = req.user.id;
   next();
});
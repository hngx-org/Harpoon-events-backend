const db = require('../models');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

const Event = db.events;


// update the user object except password
exports.updateUser = catchAsync(async (req, res, next) => {});

exports.getUser = catchAsync(async (req, res, next) => {
   req.params.id = req.user.id;
   next();
});



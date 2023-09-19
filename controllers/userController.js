const db = require('../models');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

const Event = db.events;

// filters the fields that can be updated on the user
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};

  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });

  return newObj;
};

// update the user object except password
exports.updateMe = catchAsync(async (req, res, next) => {});

exports.deleteMe = catchAsync(async (req, res, next) => {});

exports.getUser = catchAsync(async (req, res, next) => {});

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

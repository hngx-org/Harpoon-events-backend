const db = require('../models');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.createComment = catchAsync(async (req, res, next) => {
  const { event_id, body, user_id } = req.body;
  const comment = await Comment.create({ event_id, body, user_id });
  if (!comment) {
    return next(new AppError('Comment not created successfully', 400));
  }
  res.status(201).json({
    status: 'success',
    comment,
  });
});

exports.getAllCommentsByEvent = catchAsync(async (req, res, next) => {
  const { event_id } = req.body;

  const comments = await Comment.findAll({
    where: { event_id },
  });
  if (!comments) {
    return next(new AppError('Comments not found', 400));
  }
  res.status(201).json({
    status: 'success',
    comments,
  });
});

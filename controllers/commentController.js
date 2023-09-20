
const db = require('../models');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const CommentService = require('./../services/comment.service');

exports.createComment = catchAsync(async (req, res, next) => {
  const {eventId} = req.params
  const {body, user_id } = req.body;
  const comment = await Comment.create({ eventId, body, user_id });
  if (!comment) {
    return next(new AppError('Comment not created successfully', 400));
  }
  res.status(201).json({
    status: 'success',
    comment,
  });
});


// Fetching all comments for an event
exports.getAllComments = catchAsync(async (req, res, next) => {
    const comments = CommentService.getAllComments(req.params.eventId);

    if (!comments) {
        return next(new AppError('No comments found', 404));
    }

    res.status(200).json({
        status: 'success',
        comments
    });
}
);

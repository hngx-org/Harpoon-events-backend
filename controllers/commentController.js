const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const CommentService = require('./../services/comment.service');

exports.createComment = catchAsync(async (req, res, next) => {
  const comment = await CommentService.createComment(req);
  res.status(201).json({
    status: 'success',
    comment,
  });
});

// Fetching all comments for an event
exports.getAllComments = catchAsync(async (req, res, next) => {
  const comments = await CommentService.getAllComments(req.params.eventId);
  res.status(200).json({
    status: 'success',
    comments,
  });
});

// add images to comments
exports.addImageToComments = catchAsync(async (req, res, next) => {
  const newImage = await CommentService.addImageToComments(req);

  res.status(201).json({
    status: 'success',
    image: newImage,
  });
});

exports.getImagesfromComments = catchAsync(async (req, res, next) => {
  const commentImages = await CommentService.getImagesfromComments(req);

  res.status(200).json({
    status: 'success',
    image: commentImages.Images,
  });
});

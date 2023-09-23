const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const CommentService = require('./../services/comment.service');

/**
 * Create a new comment.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {function} next - The next middleware function.
 * @returns {Promise<void>} - A promise that resolves when the comment is created.
 */
exports.createComment = catchAsync(async (req, res, next) => {
  const comment = await CommentService.createComment(req);
  res.status(201).json({
    status: 'success',
    comment,
  });
});

/**
 * Get all comments for an event.
 *
 * @param {Object} req - The request object containing the event ID.
 * @param {Object} res - The response object.
 * @param {function} next - The next middleware function.
 * @returns {Promise<void>} - A promise that resolves with the comments.
 */
exports.getAllComments = catchAsync(async (req, res, next) => {
  const comments = await CommentService.getAllComments(req.params.eventId);
  res.status(200).json({
    status: 'success',
    comments,
  });
});

/**
 * Add an image to comments.
 *
 * @param {Object} req - The request object containing the image data.
 * @param {Object} res - The response object.
 * @param {function} next - The next middleware function.
 * @returns {Promise<void>} - A promise that resolves when the image is added.
 */
exports.addImageToComments = catchAsync(async (req, res, next) => {
  const newImage = await CommentService.addImageToComments(req);

  res.status(201).json({
    status: 'success',
    image: newImage,
  });
});

/**
 * Get images from comments.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {function} next - The next middleware function.
 * @returns {Promise<void>} - A promise that resolves with the comment images.
 */
exports.getImagesfromComments = catchAsync(async (req, res, next) => {
  const commentImages = await CommentService.getImagesfromComments(req);

  res.status(200).json({
    status: 'success',
    image: commentImages.Images,
  });
});







/**
 * Like a comment.
 *
 * @param {Object} req - The request object containing the comment ID.
 * @param {Object} res - The response object.
 * @param {function} next - The next middleware function.
 * @returns {Promise<void>} - A promise that resolves with a success message.
 */
exports.likeComment = catchAsync(async (req, res, next) => {
  const result = await CommentService.likeComment(req);

  res.status(200).json({
    status: 'success',
    message: result.message,
  });
});

/**
 * Unlike a comment.
 *
 * @param {Object} req - The request object containing the comment ID.
 * @param {Object} res - The response object.
 * @param {function} next - The next middleware function.
 * @returns {Promise<void>} - A promise that resolves with a success message.
 */
exports.unlikeComment = catchAsync(async (req, res, next) => {
  const result = await CommentService.unlikeComment(req);

  res.status(200).json({
    status: 'success',
    message: result.message,
  });
});



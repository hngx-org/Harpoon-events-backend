const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const LikeService = require('./../services/like.service');

/**
 * Like a comment.
 *
 * @param {Object} req - The request object containing the comment ID.
 * @param {Object} res - The response object.
 * @param {function} next - The next middleware function.
 * @returns {Promise<void>} - A promise that resolves when the comment is liked.
 */
exports.likeComment = catchAsync(async (req, res, next) => {
  const like = await LikeService.likeComment(req);

  res.status(201).json({
    status: 'success',
    like,
  });
});

/**
 * Unlike a comment.
 *
 * @param {Object} req - The request object containing the comment ID.
 * @param {Object} res - The response object.
 * @param {function} next - The next middleware function.
 * @returns {Promise<void>} - A promise that resolves when the comment is unliked.
 */
exports.unlikeComment = catchAsync(async (req, res, next) => {
  await LikeService.unlikeComment(req);

  res.status(200).json({
    status: 'success',
    message: 'Comment unliked successfully',
  });
});

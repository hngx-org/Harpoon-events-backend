const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const CommentService = require('./../services/comment.service');

/**
 * Create a new comment for an event.
 *
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 * @param {import('express').NextFunction} next - The next middleware function.
 */
exports.createComment = catchAsync(async (req, res, next) => {
  try {
    const { eventId } = req.params;
    const { body, user_id } = req.body;
    const comment = await CommentService.create({ eventId, body, user_id });

    if (!comment) {
      return next(new AppError('Comment not created successfully', 400));
    }

    res.status(201).json({
      status: 'success',
      comment,
    });
  } catch (error) {
    next(new AppError('Error creating comment: ' + error.message, 500));
  }
});

/**
 * Fetch all comments for an event.
 *
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 * @param {import('express').NextFunction} next - The next middleware function.
 */
exports.getAllComments = catchAsync(async (req, res, next) => {
  try {
    const { eventId } = req.params;
    const comments = await CommentService.getAllComments(eventId);

    if (!comments) {
      return next(new AppError('No comments found', 404));
    }

    res.status(200).json({
      status: 'success',
      comments,
    });
  } catch (error) {
    next(new AppError('Error fetching comments: ' + error.message, 500));
  }
});


/**
 * Retrieves all comments for a specific event.
 *
 * @param {any} event_id - The ID of the event for which to retrieve comments.
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of comments associated with the event.
 * @throws {Error} If there's an error while fetching the comments.
 */

const multer = require('multer');
const db = require('../models');
const AppError = require('../utils/appError');

const Comment = db.comments;
const LikeComment = db.likes;
const Image = db.images;
const Event = db.events;

/**
 * Create a new comment.
 *
 * @param {Object} req - The request object containing the event ID, user ID, and comment body.
 * @returns {Promise<Object>} A promise that resolves to the created comment object.
 * @throws {AppError} If the comment is not created successfully.
 */
exports.createComment = async (req) => {
  const event_id = req.params.eventId;
  const user_id = req.user.id;
  const { body } = req.body;
  const event = await Event.findByPk(event_id);

  if (!event) {
    throw new AppError('Event not found', 404);
  }

  const comment = await Comment.create({ event_id, body, user_id });

  if (!comment) {
    throw new AppError('Comment not created successfully', 400);
  }

  return comment;
};

/**
 * Get all comments for a specific event.
 *
 * @param {any} event_id - The ID of the event for which to retrieve comments.
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of comments associated with the event.
 */
exports.getAllComments = async (event_id) => {
  return await Comment.findAll({ where: { event_id } });
};

/**
 * Add an image to a comment.
 *
 * @param {Object} req - The request object containing the comment ID and uploaded file information.
 * @returns {Promise<Object>} A promise that resolves to the created image object.
 */
exports.addImageToComments = async (req) => {
  const commentId = req.params.commentId;
  const { thumbnail } = req.body;

  const newImage = await Image.create({
    url: thumbnail,
    CommentId: commentId,
  });

  if (newImage) {
    throw new AppError('Thumbnail not created successfully', 400);
  }

  return newImage;
};

/**
 * Get images associated with a specific comment.
 *
 * @param {Object} req - The request object containing the comment ID.
 * @returns {Promise<Object>} A promise that resolves to the comment images.
 * @throws {AppError} If the comment is not found.
 */
exports.getImagesfromComments = async (req) => {
  const commentId = req.params.commentId;
  const commentImages = await Comment.findByPk(commentId, {
    include: 'comment_images',
  });

  if (!commentImages) {
    throw new AppError('Comment not found', 404);
  }

  return commentImages;
};

/**
 * Like a comment.
 *
 * @param {Object} req - The request object containing the comment ID and user ID.
 * @returns {Promise<Object>} A promise that resolves to a success message.
 * @throws {AppError} If the user has already liked the comment.
 */
exports.likeComment = async (req) => {
  const commentId = req.params.commentId;
  const userId = req.user.id;

  const comment = await Comment.findByPk(commentId);

  if (!comment) {
    throw new AppError('This comment does not exist', 404);
  }

  const like = await LikeComment.findOne({
    where: { user_id: userId, comment_id: commentId },
  });

  if (like) {
    await like.destroy();
  } else {
    await LikeComment.create({ user_id: userId, comment_id: commentId });
  }

  return await LikeComment.findAll({});
};




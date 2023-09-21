/**
 * Creates a new comment for an event.
 *
 * @param {Object} commentData - The data for creating the comment.
 * @param {string} commentData.eventId - The ID of the event associated with the comment.
 * @param {string} commentData.body - The body of the comment.
 * @param {string} commentData.user_id - The user ID associated with the comment.
 * @returns {Promise<Object>} A promise that resolves to the created comment.
 * @throws {Error} If there's an error while creating the comment.
 */

const multer = require('multer');
const db = require('../models');
const AppError = require('../utils/appError');
const upload = multer({ dest: 'uploads/' });

const Comment = db.comments;
const Image = db.images;

exports.createComment = async (req) => {
  const event_id = req.params.eventId;
  const user_id = req.user.id;
  const { body } = req.body;
  const comment = await Comment.create({ event_id, body, user_id });

  if (!comment) {
    throw new AppError('Comment not created successfully', 400);
  }

  return comment;
};

exports.getAllComments = async (event_id) => {
  return await Comment.findAll({ where: { event_id } });
};

exports.addImageToComments = async (req) => {
  const commentId = req.params.commentId;
  const { originalname, path } = req.file;

  const newImage = await Image.create({
    url: `/uploads/${originalname}`,
    CommentId: commentId,
  });

  return newImage;
};

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

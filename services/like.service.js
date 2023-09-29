const db = require('../models');

/**
 * Like a comment.
 *
 * @param {Object} req - The request object containing the comment ID.
 * @returns {Promise<Object>} - A promise that resolves with the created like record.
 */
exports.likeComment = async (req) => {
  const { commentId } = req.params;
  const { userId } = req.body;

  // Check if the like already exists
  const existingLike = await db.likes.findOne({
    where: { comment_id: commentId, user_id: userId },
  });

  if (existingLike) {
    throw new Error('You have already liked this comment');
  }

  // Create a new like record
  const like = await db.likes.create({
    comment_id: commentId,
    user_id: userId,
  });

  return like;
};

/**
 * Unlike a comment.
 *
 * @param {Object} req - The request object containing the comment ID.
 * @returns {Promise<void>} - A promise that resolves when the comment is unliked.
 */
exports.unlikeComment = async (req) => {
  const { commentId } = req.params;
  const { userId } = req.body;

  // Find and delete the existing like
  await db.likes.destroy({
    where: { comment_id: commentId, user_id: userId },
  });
};

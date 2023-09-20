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
exports.create = async (commentData) => {
    try {
      const { eventId, body, user_id } = commentData;
      const comment = await Comment.create({ eventId, body, user_id });
      return comment;
    } catch (error) {
      throw new Error('Error creating comment: ' + error.message);
    }
  };
  
  /**
   * Retrieves all comments for a specific event.
   *
   * @param {string} event_id - The ID of the event for which to retrieve comments.
   * @returns {Promise<Array<Object>>} A promise that resolves to an array of comments associated with the event.
   * @throws {Error} If there's an error while fetching the comments.
   */
  exports.getAllComments = async (event_id) => {
    try {
      const comments = await Comment.findAll({ where: { event_id } });
      return comments;
    } catch (error) {
      throw new Error('Error fetching comments: ' + error.message);
    }
  };
  

/**
 * Retrieves all comments for a specific event.
 *
 * @param {number} event_id - The ID of the event for which to retrieve comments.
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of comments associated with the event.
 * @throws {Error} If there's an error while fetching the comments.
 */
const db = require('../models');

const Comment = db.comments;

exports.getAllComments = async (event_id) => {
    const comments = await Comment.findAll({ where: { event_id } });
    return comments;
}

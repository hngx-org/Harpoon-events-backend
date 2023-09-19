const db = require('../models');

const Comment = db.comments;

exports.getAllComments = async (event_id) => {
    const comments = await Comment.findAll({ where: { event_id } });
    return comments;
}
const catchAsync = require("../utils/catchAsync");
const AppError = require('./../utils/appError');
const CommentService = require('./../services/comment.service');


// Fetching all comments for an event
exports.getAllComments = catchAsync(async (req, res, next) => {
    const comments = CommentService.getAllComments(req.params.eventId);

    if (!comments) {
        return next(new AppError('No comments found', 404));
    }

    res.status(200).json({
        status: 'success',
        comments
    });
}
);
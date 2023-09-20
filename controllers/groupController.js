const catchAsync = require("../utils/catchAsync");
const GroupService = require("../services/group.service");

exports.getSingleGroup = catchAsync(async (req, res, next) => {
    const group = await GroupService.getSingleGroup(req.params.groupId);

    if (!group) {
        return next(new AppError('No group found', 404));
    }

    res.status(200).json({
        status: 'success',
        group
    });
}
);
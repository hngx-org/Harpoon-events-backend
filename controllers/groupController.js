const db = require('../models');
const catchAsync = require('../utils/catchAsync');
const GroupService = require('./../services/group.service');

// add user to group
exports.addUserToGroup = catchAsync(async (req, res, next) => {
  const group = await GroupService.addUserToGroup(req);

  res.status(201).json({ status: 'success', group });
});

// Controller for creating a new group
exports.createGroup = catchAsync(async (req, res, next) => {
  const group = await GroupService.createGroup(req);

  res.status(201).json({
    status: 'success',
    group,
  });
});

// Controller for fetching all groups
exports.getAllGroups = catchAsync(async (req, res, next) => {
  const groups = await GroupService.getAllGroups();

  res.status(200).json({
    status: 'success',
    groups,
  });
});

// Controller for fetching a single group by ID
exports.getGroupById = catchAsync(async (req, res, next) => {
  const group = await GroupService.getGroupById(req);
  res.status(200).json({
    status: 'success',
    group,
  });
});

// Controller for updating a group by ID
exports.updateGroupById = catchAsync(async (req, res, next) => {
  const group = await GroupService.updateGroupById(req);

  res.status(200).json({
    status: 'success',
    group,
  });
});

// Controller for deleting a group by ID
exports.deleteGroupById = catchAsync(async (req, res, next) => {
  await GroupService.deleteGroupById(req);
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

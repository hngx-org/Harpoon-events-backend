const db = require('../models');
const Group = db.groups;

// Controller for creating a new group
exports.createGroup = async (req, res, next) => {
  try {
    const { title } = req.body;
    const group = await Group.create({ title });

    res.status(201).json({
      status: 'success',
      group,
    });
  } catch (error) {
    next(error);
  }
};

// Controller for fetching all groups
exports.getAllGroups = async (req, res, next) => {
  try {
    const groups = await Group.findAll();

    res.status(200).json({
      status: 'success',
      groups,
    });
  } catch (error) {
    // Handle errors here
    next(error);
  }
};

// Controller for fetching a single group by ID
exports.getGroupById = async (req, res, next) => {
  try {
    const groupId = req.params.groupId;
    const group = await Group.findByPk(groupId);

    if (!group) {
      // Return an error if the group doesn't exist
      return res.status(404).json({
        status: 'error',
        message: 'Group not found',
      });
    }

    res.status(200).json({
      status: 'success',
      group,
    });
  } catch (error) {
    next(error);
  }
};

// Controller for updating a group by ID
exports.updateGroupById = async (req, res, next) => {
  try {
    const groupId = req.params.groupId;
    const { title } = req.body;

    const group = await Group.findByPk(groupId);

    if (!group) {
      // Return an error if the group doesn't exist
      return res.status(404).json({
        status: 'error',
        message: 'Group not found',
      });
    }

    group.title = title;
    await group.save();

    res.status(200).json({
      status: 'success',
      group,
    });
  } catch (error) {
    next(error);
  }
};

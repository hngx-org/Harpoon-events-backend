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

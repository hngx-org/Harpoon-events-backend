const db = require('../models');

const Group = db.groups;

exports.getSingleGroup = async (groupId) => {
    const group = await Group.findByPk(groupId);
    return group;
}
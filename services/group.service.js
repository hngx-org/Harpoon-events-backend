/**
 * Retrieves a single group by its ID.
 *
 * @param {number | string} groupId - The ID of the group to retrieve.
 * @returns {Promise<Object|null>} A promise that resolves to the retrieved group object or null if not found.
 * @throws {Error} If there's an error while fetching the group.
 */
const db = require('../models');
const AppError = require('../utils/appError');

const Group = db.groups;
const UserGroup = db.userGroups;

/**
 * Retrieves a single group by its ID.
 *
 * @param {number | string} groupId - The ID of the group to retrieve.
 * @returns {Promise<Object|null>} A promise that resolves to the retrieved group object or null if not found.
 * @throws {Error} If there's an error while fetching the group.
 */
exports.getSingleGroup = async (groupId) => {
  const group = await Group.findByPk(groupId);

  if (!group) {
    throw new AppError('Group creation not successful', 400);
  }
  return group;
};

exports.addUserToGroup = async (req) => {
  const { userId, groupId } = req.params;

  const group = await Group.findByPk(groupId);

  if (!group) {
    throw new AppError('Group not found', 404);
  }

  const updatedInfo = { user_id: userId, group_id: groupId };
  await UserGroup.update(updatedInfo, {
    where: { id: groupId },
  });

  return await Group.findByPk(eventId);
};

exports.createGroup = async (req) => {
  const group = await Group.create({ title: req.title });
  if (!group) {
    throw new AppError('Group creation not successful', 400);
  }
  return group;
};

exports.getAllGroups = async () => {
  return await Group.findAll();
};

exports.getGroupById = async (req) => {
  const groupId = req.params.groupId;
  const group = await Group.findByPk(groupId);

  if (!group) {
    throw new AppError('Group not found', 404);
  }

  return group;
};

exports.updateGroupById = async (req) => {
  const groupId = req.params.groupId;
  const { title } = req.body;

  const group = await Group.findByPk(groupId);

  if (!group) {
    throw new AppError('Group not found', 404);
  }

  await Group.update(
    {
      id: groupId,
      title,
    },
    {
      where: { id: eventId },
    }
  );

  return await Group.findByPk(eventId);
};

exports.deleteGroupById = async (req, res, next) => {
  const groupId = req.params.groupId;
  const group = await Group.findByPk(groupId);

  if (!group) {
    throw new AppError('Group not found', 404);
  }

  await group.destroy();

  return null;
};


/**
 * Retrieves a single group by its ID.
 *
 * @param {number | string} groupId - The ID of the group to retrieve.
 * @returns {Promise<Object|null>} A promise that resolves to the retrieved group object or null if not found.
 * @throws {Error} If there's an error while fetching the group.
 */
const db = require('../models');

const Group = db.groups;

/**
 * Retrieves a single group by its ID.
 *
 * @param {number | string} groupId - The ID of the group to retrieve.
 * @returns {Promise<Object|null>} A promise that resolves to the retrieved group object or null if not found.
 * @throws {Error} If there's an error while fetching the group.
 */
exports.getSingleGroup = async (groupId) => {
    try {
        const group = await Group.findByPk(groupId);
        return group;
    } catch (error) {
        throw error;
    }
}

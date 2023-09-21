const router = require('express').Router();

const {
  createGroup,
  getAllGroups,
  getGroupById,
  updateGroupById,
  deleteGroupById,
  addUserToGroup,
  removeUserFromGroup
} = require('../controllers/groupController');
const requireAuth = require('../middleware/requireAuth');

// middleware to check if user is logged in
router.use(requireAuth);

// Routes for Groups
router
  .route('/')
  .post(createGroup)
  .get(getAllGroups);

router
  .route('/:groupId')
  .get(getGroupById)
  .put(updateGroupById)
  .delete(deleteGroupById);

router
  .route('/:groupId/members/:userId')
  .post(addUserToGroup)
  .delete(removeUserFromGroup);
  

module.exports = router;

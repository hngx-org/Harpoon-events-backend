const express = require('express');
const groupController = require('../controllers/groupController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// middleware to check if user is logged in
router.use(requireAuth);

// Routes for Groups
router
  .route('/')
  .post(groupController.createGroup)
  .get(groupController.getAllGroups);

router
  .route('/:groupId')
  .get(groupController.getGroupById)
  .put(groupController.updateGroupById)
  .delete(groupController.deleteGroupById);

router
  .route('/:groupId/members/:userId')
  .post(groupController.addUserToGroup)
  

module.exports = router;

const express = require('express');
const groupController = require('../controllers/groupController');

const router = express.Router();

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

module.exports = router;

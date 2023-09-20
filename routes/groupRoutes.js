const express = require('express');
const groupController = require('../controllers/groupController');
const authController = require('../controllers/authController');

const router = express.Router();

// * Middleware to check if user is logged in
router.use(authController.protect);

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

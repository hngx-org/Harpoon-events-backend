const express = require('express');
const groupController = require('../controllers/groupController');

const router = express.Router();
const authController = require('../controllers/authController')

// middleware to check if user is logged in
router.use(authController.protect);

router
    .route('/:groupId')
    .get(groupController.getSingleGroup);

module.exports = router;

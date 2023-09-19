const express = require('express');

const eventController = require('../controllers/eventController');
const authController = require('../controllers/authController');
const commentController = require('../controllers/commentController');

const router = express.Router();

// middleware to check if user is logged in
router.use(authController.protect);

// Event routes
router
  .route('/')
  .get(eventController.getAllEvent)
  .post(eventController.createEvent);

router
  .route('/:eventId')
  .get(eventController.getSingleEvent)
  .patch(eventController.updateEvent)
  .delete(eventController.deleteEvent);

// Comments Routes
router
  .route('/events/:eventId/comments')
  .get(commentController.getAllComments);

module.exports = router;

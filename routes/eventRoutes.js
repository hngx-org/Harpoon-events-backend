const express = require('express');

const eventController = require('../controllers/eventController');
const authController = require('../controllers/authController');
const commentController = require('../controllers/commentController');

const router = express.Router();

// middleware to check if user is logged in
router.use(authController.protect);

// Event routes
router
  .route('/events')
  .get(eventController.getAllEvent)
  .post(eventController.createEvent);

router
  .route('/events/:eventId')
  .get(eventController.getSingleEvent)
  .patch(eventController.updateEvent)
  .delete(eventController.deleteEvent);

// Comments Routes
// Yet to be done.

module.exports = router;

const express = require('express');

const eventController = require('../controllers/eventController');
const commentController = require('../controllers/commentController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// middleware to check if user is logged in
router.use(requireAuth);

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
  .post(commentController.createComment)
.get(commentController.getAllComments);
// Update a Comment:
//Delete a Comment:

  


module.exports = router;

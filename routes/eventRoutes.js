const router  = require('express').Router();

const eventController = require('../controllers/eventController');
const authController = require('../controllers/authController');
const commentController = require('../controllers/commentController');

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
  .post(commentController.createComment)
  .get(commentController.getAllComments);



// Update a Comment:


//Delete a Comment:

  


module.exports = router;

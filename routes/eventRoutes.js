const express = require('express');
const multer = require('multer');

const eventController = require('../controllers/eventController');
const commentController = require('../controllers/commentController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

const upload = multer({ dest: 'uploads/' });

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
  .put(eventController.updateEvent)
  .delete(eventController.deleteEvent);

// Comments Routes
router
  .route('/:eventId/comments')
  .post(commentController.createComment)
  .get(commentController.getAllComments);
// Update a Comment:
//Delete a Comment:

// comments with images
router
  .route('/comments/:commentId/images')
  .post(upload.single('image'), commentController.addImageToComments)
  .get(commentController.getImagesfromComments);

module.exports = router;

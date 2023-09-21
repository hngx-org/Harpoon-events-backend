const router = require('express').Router();
const multer = require('multer');

const {
  getAllEvent,
  createEvent, 
  getSingleEvent,
  updateEvent,
  deleteEvent
} = require('../controllers/eventController');

const {
  createComment,
  getAllComments,
  addImageToComments,
  getImagesfromComments
} = require('../controllers/commentController');

const requireAuth = require('../middleware/requireAuth');

const upload = multer({ dest: 'uploads/' });

// middleware to check if user is logged in
router.use(requireAuth);

// Event routes
router
  .route('/')
  .get(getAllEvent)
  .post(createEvent);

router
  .route('/:eventId')
  .get(getSingleEvent)
  .put(updateEvent)
  .delete(deleteEvent);

// Comments Routes
router
  .route('/:eventId/comments')
  .post(createComment)
  .get(getAllComments);

// Update a Comment:


//Delete a Comment:

// comments with images
router
  .route('/comments/:commentId/images')
  .post(upload.single('image'), addImageToComments)
  .get(getImagesfromComments);

module.exports = router;

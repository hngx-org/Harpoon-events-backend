const router = require('express').Router();

const {
  getUser,
  updateUser,
  interestedEvent,
  removeInterest,
} = require('../controllers/userController');
const {
  signup,
  login,
  Google,
  Twitter,
} = require('../controllers/authController');

router.post('/signup', signup);
router.post('/login', login);
router.post('/google', Google);
router.post('/twitter', Twitter);

// middleware to check if user is logged in
router.use(requireAuth);

router.route('/:userId').get(getUser).put(updateUser);

// user expresses interest in an event
router.post('/:userId/interests/:eventId', interestedEvent);
router.delete('/:userId/interests/:eventId', removeInterest);

module.exports = router;

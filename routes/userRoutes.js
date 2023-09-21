const express = require('express');

const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const requireAuth = require('../middleware/requireAuth');

//mounting route
const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/google', authController.Google);
router.post('/twitter', authController.Twitter);

// middleware to check if user is logged in
router.use(requireAuth);

router.get('/', userController.getUser);
router.put('/:id', userController.updateUser);

// user expresses interest in an event
router.post('/:userId/interests/:eventId', userController.interestedEvent);

module.exports = router;

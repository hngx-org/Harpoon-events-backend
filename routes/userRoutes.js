const express = require('express');

const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

//mounting route
const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/forgotPassword', authController.forgetPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

//protect middleware to all the route that comes after this line
router.use(authController.protect);

router.get('/me', userController.getMe, userController.getUser);
router.patch('/updatePassword', authController.updatePassword);
router.patch('/updateMe', userController.updateMe);
router.delete('/deleteMe', userController.deleteMe);

module.exports = router;

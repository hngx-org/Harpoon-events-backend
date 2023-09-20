const express = require('express');

const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

//mounting route
const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/google', authController.Google);


//protect middleware to all the route that comes after this line
router.use(authController.protect);

router.get('/',  userController.getUser);
router.put('/:id', userController.updateUser);


module.exports = router;

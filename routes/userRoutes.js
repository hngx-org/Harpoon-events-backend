const router = require('express').Router();

const requireAuth = require('./../middleware/requireAuth');

const {getUser,updateUser,interestedEvent,removeInterest,} = require('../controllers/userController');
const {signup,login,Google,Twitter,} = require('../controllers/authController');

/**
 * @swagger
 *  components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - avatar
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         name:
 *           type: string
 *           description: The name of user
 *         email:
 *           type: string
 *           description: The email of user
 *         avatar:
 *           type: string
 *           description: the image representation of user
 * 
 *     
 */

 /**
  * @swagger
  * tags:
  *   name: User
  *   description: API's for managing the user
  */


router.post('/signup', signup);



router.post('/login', login);

/**
 * @swagger
 * /users/google:
 *     post:
 *      tags: [User]
 *      summary: login a user via google
 *      requestBody:
 *       content:
 *         application/json:
 *           schema:     
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               avatar:
 *                 type: string
 *             example:   
 *               id: 
 *               name: Jessica Smith
 *               email: jessy@gmail.com
 *               avatar: image.jpg
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description:This user already exists
 *       500:
 *         description: Server Error
 */
// test the endpoint http://web-01.okoth.tech/api/v1
router.post('/google', Google);


/**
 * @swagger
 * /users/twiter:
 *     post:
 *      tags: [User]
 *      summary:  a new user via twitter
 *      requestBody:
 *       content:
 *         application/json:
 *           schema:     
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               avatar:
 *                 type: string
 *             example:   
 *               id: 
 *               name: Jessica Smith
 *               email: jessy@gmail.com
 *               avatar: image.jpg
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description:This user already exists
 *       500:
 *         description: Server Error
 */
// test the endpoint http://web-01.okoth.tech/api/v1
router.post('/twitter', Twitter);

// middleware to check if user is logged in
router.use(requireAuth);

/**
 * 
 * @swagger
 * /users/{:userId}:
 *   get:
 *     summary: Get the user by id
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: userid
 *         schema:
 *           type: string
 *         required: true
 *         description: String value of user to get
 *     responses:
 *       200:
 *         description: This api retrieves user by id
 *         contents:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: The user was not found
 */

router.route('/:userId').get(getUser).put(updateUser);

// user expresses interest in an event
/**
 * @swagger
 * /users/twitter:
 *   post:
 *     summary: signs up user to application with twitter
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref:'#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Sign Up successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref:'#/components/schemas/User'
 *       400:
 *          description:This user already exists
 *       500:
 *         description: Server Error
 */
// test the endpoint http://web-01.okoth.tech/api/v1/
router.post('/:userId/interests/:eventId', interestedEvent);
/**
 * @swagger
 * //{:userId}/interests/{:eventId}:
 *   delete:
 *     summary: Remove the interest in event by id
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The event id
 * 
 *     responses:
 *       200:
 *         description: The interest was deleted
 *       404:
 *         description: The interest was not found
 */
router.delete('/:userId/interests/:eventId', removeInterest);

module.exports = router;

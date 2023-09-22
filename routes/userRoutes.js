const router = require('express').Router();

const requireAuth = require('./../middleware/requireAuth');

/**
* @swagger
* components:
*  schemas:
*    Users:
*      type: object
*      required:
*        - name
*        - email
*      properties:
*        id:
*          type: string 
*        name:
*          type: string          
*        email:
*          type: string* 
*/

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

/**
* @swagger
*  /api/v1/users/google:
*    post:
*      summary: SignUp/LogIn with Google
*      tags:
*        - Users
*      requestBody:
*         required: true
*         content:
*           application/json:
*             schema:
*               type: object  
*               properties:
*                 name: 
*                   type: string
*                   default: example.com
*                 email: 
*                   type: string
*                   default: example@gmail.com  
*    
*      responses:
*        201:
*          description: User logged in/ Sign up  successfully
*        500:
*          description: Error Occurred
*          content:
*            application/json:
*             schema:
*               $ref: '#/components/schemas/Users'      
 */


/**
* @swagger
*  /api/v1/users/twitter:
*    post:
*      summary: SignUp/LogIn with Twitter
*      tags:
*        - Users
*      requestBody:
*         required: true
*         content:
*           application/json:
*             schema:
*               type: object  
*               properties:
*                 name: 
*                   type: string
*                   default: example.com
*                 email: 
*                   type: string
*                   default: example@gmail.com  
*    
*      responses:
*        201:
*          description: User logged in/ Sign up  successfully
*        500:
*          description: Error Occurred
*          content:
*            application/json:
*             schema:
*               $ref: '#/components/schemas/Users'      
 */

/**
* @swagger
*  /api/v1/users/{userId}:
*    get:
*      security:
*        - bearerAuth: []
*      summary: Get User By ID
*      tags:
*        - Users
*      parameters:
*        - in: path
*          name: userId
*          required: true
*          schema:
*            type: string
*      responses:
*        200:
*          description: Get user details successfully 
*        404:
*          description: User not found 
*        500:
*          description: Error Occurred
*          content:
*            application/json:
*             schema:
*               $ref: '#/components/schemas/Users'      
 */


/**
* @swagger
*  /api/v1/users/{userId}:
*    put:
*      security:
*        - bearerAuth: []
*      summary: Get User By ID
*      tags:
*        - Users
*      parameters:
*        - in: path
*          name: userId
*          required: true
*          schema:
*            type: string
*      requestBody:
*         required: true
*         content:
*           application/json:
*             schema:
*               type: object  
*               properties:
*                 name: 
*                   type: string
*                   default: example.com
*                 email: 
*                   type: string
*                   default: example@gmail.com  
*    
*      responses:
*        200:
*          description: Get user details successfully 
*        404:
*          description: User not found 
*        500:
*          description: Error Occurred
*          content:
*            application/json:
*             schema:
*               $ref: '#/components/schemas/Users'      
 */


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

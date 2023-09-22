const router = require('express').Router();
const multer = require('multer');

/**
 * @swagger
 * components:
 *  schemas:
 *    Events:
 *      type: object
 *      required:
 *        - title
 *        - description
 *        - creator
 *        - location
 *        - start_time
 *        - end_time
 *        - start_date
 *        - end_date
 *        - image
 *      properties:
 *        id:
 *          type: string 
 *        title:
 *          type: string          
 *        description:
 *          type: string
 *        creator:
 *          type: string
 *        location:
 *          type: string
 *        start_time:
 *          type: string
 *        end_time:
 *          type: string
 *        start_date:
 *          type: string
 *        end_date:
 *          type: string
 *        image:
 *          type: string
 * 
 */
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



/**
* @swagger
*
*  /api/v1/events/comments/{commentId}/images:
*    get:
*      security:
*       - bearerAuth: []
*      summary: Get images for a comment
*      tags:
*        - Events
*      parameters:
*        - in: path
*          name: commentId
*          required: true
*          schema:
*            type: string
*      responses:
*        200:
*          description: Successful response
*        404:
*          description: Images not found
*        500:
*          description: Server Error
*          content:
*            application/json:
*             schema:
*               type: object
*               items:
*                   $ref: '#/components/schemas/Events'
 */

/**
* @swagger
*  /api/v1/events/comments/{commentId}/likes/{userId}:
*    post:
*      summary: Add like to a comment
*      tags:
*        - Events
*      parameters:
*        - in: path
*          name: commentId
*          required: true
*          schema:
*            type: string
*        - in: path
*          name: userId
*          required: true
*          schema:
*            type: string
*      responses:
*        '200':
*          description: Likes Added Successfully
*          content:
*            application/json:
 */

/**
* @swagger
*  /api/comments/{commentId}/likes/{userId}:
*    delete:
*      summary: Remove like from a comment
*      tags:
*        - Events
*      parameters:
*        - in: path
*          name: commentId
*          required: true
*          schema:
*            type: string
*        - in: path
*          name: userId
*          required: true
*          schema:
*            type: string
*      responses:
*        '200':
*          description: Likes Added Successfully
*          content:
*            application/json:
 */


// comments with images
router
  .route('/comments/:commentId/images')
  .post(upload.single('image'), addImageToComments)
  .get(getImagesfromComments);

module.exports = router;

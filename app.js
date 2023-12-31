const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const yaml = require("yamljs");

//importing utils
const AppError = require('./utils/appError');
const errorController = require('./controllers/errorController');

//importing routers
const userRouter = require(`${__dirname}/routes/userRoutes`);
const eventRouter = require(`${__dirname}/routes/eventRoutes`);
const groupRouter = require(`${__dirname}/routes/groupRoutes`);

const app = express();
const swaggerDocs = yaml.load('./swagger.yaml');

app.use(cors());

const options = {
  failOnErrors: true, // Whether or not to throw when parsing errors. Defaults to false.
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'HNGx - Team Harpoon API',
      version: '1.0.0',
      description: 'An Event Application API',
    },
    servers: [
      {
        url: 'http://web-01.okoth.tech',
      },
      {
        url: 'http://localhost:8000',
      },
    ],
  },
  apis: ['./routes/*.js', './app.js'],
};

const specs = swaggerJSDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
// GLOBAL MIDDLEWARES

// set security http
app.use(helmet());
//including global middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// This allows 100 request from an IP in one
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, Please try again in an hour',
});

/**
 * @swagger
 *  /:
 *   get:
 *     summary: Returns a message that the api is working
 *     tags: [Test]
 *     responses:
 *       200:
 *         description: This endpoint returns a message if the api is working.
 */

// test the endpoint http://localhost:8000/
app.get('/', (req, res) => {
  res.json({ message: 'api is working' });
});

app.use('/api', limiter);

// Body Parser, reading data from body in req.body
app.use(express.json({ limit: '10kb' }));

// Data sanitization against XSS
app.use(xss());

//MOUNTING THE ROUTES
app.use(`/api/v1/users`, userRouter);
app.use(`/api/v1/events`, eventRouter);
app.use('/api/v1/groups', groupRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// This middleware can only execute if the above two where not executed, hence it is a better way to handle errors
// no need to call next though
app.all(`*`, (req, res, next) => {
  const err = new AppError(
    `Can\'t find ${req.originalUrl} on this server`,
    404
  );
  next(err);
  //if the next function receives an argument, express assumes its an error
});

//this middleware catches every error and throws the response for it
app.use(errorController);

module.exports = app;

const Joi = require('joi');

const registerValidationSchema = Joi.object().keys({
  name: Joi.string().required().min(5),
  email: Joi.string().required().email(),
  image: Joi.string().required(),
  password: Joi.string().required().min(3),
});

module.exports = signupValidationSchema;

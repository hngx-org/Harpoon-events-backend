const Joi = require('joi');

const signupValidationSchema = Joi.object().keys({
  name: Joi.string().required().min(5),
  email: Joi.string().required().email(),
  image: Joi.string().optional(),
  password: Joi.string().required().min(3),
});

module.exports = signupValidationSchema;

const Joi = require('joi');

const signInValidationSchema = Joi.object().keys({
  email: Joi.string().required().email(),
  password: Joi.string().required().min(3),
});

module.exports = signInValidationSchema;

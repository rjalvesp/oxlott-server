const Joi = require("joi");

const schema = {
  _id: Joi.string().required(),
  sub: Joi.string().required(),
  given_name: Joi.string().required(),
  family_name: Joi.string().required(),
  nickname: Joi.string(),
  name: Joi.string().required(),
  picture: Joi.string(),
  locale: Joi.string(),
  updated_at: Joi.string(),
  email: Joi.string().required(),
  email_verified: Joi.boolean().required(),
  country: Joi.string().optional(),
  legal_id: Joi.string().optional(),
  legal_verified: Joi.boolean().required().default(false),
};

const updateController = {
  name: Joi.string().optional(),
  phone: Joi.string().optional(),
  picture: Joi.string().optional()
};

module.exports = {
  model: schema,
  updateController: updateController
};

const Joi = require("joi");

module.exports = {
  limit: Joi.number().default(10).min(10).max(100),
  skip: Joi.number().default(0).min(0),
  selector: Joi.any().default({}),
  fields: Joi.array().items(Joi.string()),
  sort: Joi.array().items(Joi.any()),
};

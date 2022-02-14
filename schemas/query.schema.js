const Joi = require("joi");

module.exports = {
  limit: Joi.number().default(10).min(10).max(100),
  skip: Joi.number().default(0).min(0),
};

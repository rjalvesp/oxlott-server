const Joi = require("joi");

module.exports = {
  model: {
    userId: Joi.string().required(),
    balance: Joi.number().required(),
  },
};

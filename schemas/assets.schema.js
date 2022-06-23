const Joi = require("joi").extend(require("@joi/date"));

module.exports = {
  controller: {
    content: Joi.string().required(),
    type: Joi.string().required(),
  },
};

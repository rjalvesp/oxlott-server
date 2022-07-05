const Joi = require("joi").extend(require("@joi/date"));
const { model: usersModel } = require("./users.schema");
const { model: paymentsModel } = require("./payments.schema");

const schema = {
  balance: Joi.number().required(),
};

module.exports = {
  model: {
    ...schema,
    user: Joi.object(usersModel).required(),
    payment: Joi.object(paymentsModel).required(),
  }
};

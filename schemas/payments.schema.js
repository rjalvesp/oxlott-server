const Joi = require("joi");
const { model: usersModel } = require("./users.schema");

module.exports = {
  model: {
    userId: Joi.string().required(),
    paymentId: Joi.string().required(),
    checkoutSession: Joi.string().optional(),
    amountSubtotal: Joi.string().optional(),
    amountTotal: Joi.string().optional(),
    paymentIntentId: Joi.string().optional(),
    paid: Joi.boolean().default(false),
    user: Joi.object(usersModel),
  },
  query: {
    token: Joi.string().required(),
  },
};

const Joi = require("joi");

module.exports = {
  model: {
    userId: Joi.string().required(),
    paymentId: Joi.string().required(),
    checkoutSession: Joi.string().optional(),
    amountSubtotal: Joi.string().optional(),
    amountTotal: Joi.string().optional(),
    paymentIntentId: Joi.string().optional(),
    paid: Joi.boolean().default(false),
  },
  query: {
    token: Joi.string().required(),
  },
};

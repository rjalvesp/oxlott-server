const Joi = require("joi").extend(require("@joi/date"));
const { model: eventsModel } = require("./events.schema");
const { model: usersModel } = require("./users.schema");
const { model: paymentsModel } = require("./payments.schema");

const schema = {
  date: Joi.date().format("YYYY-MM-DD").utc(),
  data: Joi.array().items(Joi.string()).required(),
};

module.exports = {
  model: {
    ...schema,
    event: Joi.object(eventsModel).required(),
    user: Joi.object(usersModel).required(),
    payment: Joi.object(paymentsModel).required(),
  },
  controller: {
    ...schema,
    userId: Joi.string().required(),
    eventId: Joi.string().required(),
    paymentId: Joi.string().required(),
  },
  block: {
    eventId: Joi.string().required(),
    data: Joi.array().items(Joi.string()).required(),
  },
};

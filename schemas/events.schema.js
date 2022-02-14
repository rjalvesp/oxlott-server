const Joi = require("joi").extend(require("@joi/date"));
const { model: eventTypesModel } = require("./event-types.schema");
const { model: usersModel } = require("./users.schema");
const { model: paymentsModel } = require("./payments.schema");

const winnerSchema = {
  date: Joi.date().format("YYYY-MM-DD").utc(),
  data: Joi.array().items(Joi.string()).required(),
  user: Joi.object(usersModel).required(),
  payment: Joi.object(paymentsModel).required(),
};

const schema = {
  cost: Joi.number().required(),
  name: Joi.string().required(),
  from: Joi.date().format("YYYY-MM-DD").utc().required(),
  to: Joi.date().format("YYYY-MM-DD").utc(),
  prize: Joi.string()
    .pattern(/^[1-9][0-9]+$/, { name: "numeric" })
    .required(),
  disabled: Joi.boolean().default(false).optional(),
  winnerBill: Joi.object(winnerSchema).optional(),
};

module.exports = {
  model: {
    ...schema,
    eventType: Joi.object(eventTypesModel).required(),
  },
  controller: {
    ...schema,
    eventTypeId: Joi.string().required(),
  },
};

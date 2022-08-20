const Joi = require("joi").extend(require("@joi/date"));
const { model: eventsModel } = require("./events.schema");
const { model: usersModel } = require("./users.schema");

const schema = {
  date: Joi.date().format("YYYY-MM-DD").utc(),
  data: Joi.array().items(Joi.number()).required(),
  claimed: Joi.boolean().default(false),
  paid: Joi.boolean().default(false),
};

module.exports = {
  model: {
    ...schema,
    event: Joi.object(eventsModel).required(),
    user: Joi.object(usersModel).required(),
  },
  controller: {
    eventId: Joi.string().required(),
    tickets: Joi.array()
      .items(Joi.object({ data: schema.data }))
      .max(10)
      .min(1),
  },
  block: {
    eventId: Joi.string().required(),
    data: Joi.array().items(Joi.string()).required(),
  },
};

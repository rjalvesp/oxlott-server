const Joi = require("joi");

const dayjsUnits = {
  start: Joi.string().required(),
  duration: Joi.object({
    days: Joi.number().optional(),
    hours: Joi.number().optional(),
  }).required(),
};

const schema = {
  name: Joi.string().required(),
  defaultCost: Joi.number().positive().required(),
  defaultPrize: Joi.number().positive().required(),
  elements: Joi.number().min(1).max(15).required(),
  requiresWinner: Joi.boolean().default(false).optional(),
  isSorted: Joi.boolean().default(true),
  minValue: Joi.string()
    .pattern(/^[0-9][0-9][0-9]$/, { name: "min value" })
    .required(),
  maxValue: Joi.string()
    .pattern(/^[0-9][0-9][0-9]$/, { name: "max value" })
    .required(),
  frequency: Joi.string().default("* * * * *").required(),
  at: Joi.array().items(dayjsUnits).required(),
  disabled: Joi.boolean().default(false).optional(),
};

module.exports = {
  model: schema,
  controller: schema,
};

const { model: schema } = require("../schemas/balance.schema");
const { db } = require("../database");

module.exports = db.createModel({
  type: "balance",
  design: "balances",
  schema,
  overrideId: true,
});

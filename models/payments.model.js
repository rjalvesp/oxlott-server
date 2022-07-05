const { model: schema } = require("../schemas/payments.schema");
const { db } = require("../database");

module.exports = db.createModel({
  type: "payment",
  design: "payments",
  schema,
});

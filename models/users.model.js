const { model: schema } = require("../schemas/users.schema");
const { db } = require("../database");

module.exports = db.createModel({
  type: "user",
  design: "users",
  schema,
  overrideId: true,
});

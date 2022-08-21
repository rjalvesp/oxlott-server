const { model: schema } = require("../schemas/payments.schema");
const { db } = require("../database");

module.exports = db.createModel({
  type: "payment",
  design: "payments",
  schema,
});

// TODO
// const { model: schema } = require("../schemas/payments.schema");
// const { db } = require("../database");
// const { increaseOverTime } = require("./stats.model");

// const model = db.createModel({
//   type: "payment",
//   design: "payments",
//   schema,
// });

// model.baseCreate = model.create;

// model.create = (body, user) => {
//   Promise.all([
//     increaseOverTime(`payment`),
//     increaseOverTime(`payment:${user._id}`),
//   ]);
//   return model.baseCreate(body);
// };

// module.exports = model;

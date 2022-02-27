const { model: schema } = require("../schemas/bills.schema");
const { db } = require("../database");

const model = db.createModel({ type: "bill", design: "bills", schema });

module.exports = model;

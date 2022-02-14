const { model: schema } = require("../schemas/bills.schema");
const { db } = require("../database");

module.exports = db.createModel({ type: "bill", design: "bills", schema });

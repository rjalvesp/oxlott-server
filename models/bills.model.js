const R = require("ramda");
const { model: schema } = require("../schemas/bills.schema");
const { db, redis } = require("../database");

const model = db.createModel({ type: "bill", design: "bills", schema });

model.isBlocked = (userId, eventId, data) =>
  redis
    .get(`${userId}:${eventId}:${data.join(":")}`)
    .then(Boolean)
    .then(R.objOf("isBlocked"));

model.block = (userId, eventId, data) =>
  redis
    .set(`${userId}:${eventId}:${data.join(":")}`, true, {
      EX: 90,
      NX: true,
    })
    .then(() => model.isBlocked(userId, eventId, data));

model.unblock = (userId, eventId, data) =>
  redis
    .del(`${userId}:${eventId}:${data.join(":")}`)
    .then(() => model.isBlocked(userId, eventId, data));

module.exports = model;

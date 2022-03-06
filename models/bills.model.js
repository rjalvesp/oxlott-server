const R = require("ramda");
const logger = require("../logger");
const { model: schema } = require("../schemas/bills.schema");
const { db, redis, createQueue } = require("../database");

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

model.baseCreate = model.create;

const modelQueue = createQueue("Bill Creation").process(({ data: body }) => {
  const {
    user: { _id: userId },
    user: { _id: eventId },
    data,
  } = body;
  return model.isBlocked(userId, eventId, data).then(({ isBlocked }) => {
    if (!isBlocked) {
      const message = `Bill not blocked ${userId} ${eventId} ${JSON.stringify(
        body.data
      )}`;
      logger.error(message);
      throw new Error(message);
    }
    return model
      .unblock(userId, eventId, body.data)
      .then(() => model.baseCreate(body));
  });
});

model.create = modelQueue.add;

module.exports = model;

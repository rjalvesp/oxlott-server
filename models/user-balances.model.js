const R = require("ramda");
const { model: schema } = require("../schemas/user-balances.schema");
const { db, createQueue } = require("../database");
const logger = require("../logger");

const model = db.createModel({
  type: "userBalance",
  design: "userBalances",
  schema,
  overrideId: true,
});

const queues = {};

const add = (userId, body) => {
  const { amountSubtotal, paid, _id } = body;
  if (!paid) {
    logger.error(`Unpaid ${userId} ${_id}`);
    throw new Error(`Unpaid ${userId} ${_id}`);
  }
  return model
    .find({ selector: { userId } })
    .then(R.path(["data", "0"]))
    .then((doc) =>
      model.update(doc._id, {
        ...doc,
        balance: doc.balance + amountSubtotal,
      })
    )
    .catch((a) => model.create({ userId, balance: amountSubtotal }));
};

const subtract = (userId, body) => {
  const { bills } = body;
  return model
    .find({ selector: { userId } })
    .then(R.pathOr({ balance: 0 }, ["data", 0]))
    .then((doc) => {
      const billsCosts = R.pipe(
        R.map(R.pathOr(0, ["event", "cost"])),
        R.sum
      )(bills);
      const balance = doc.balance - billsCosts * 100;
      if (balance < 0) {
        logger.error(`Insufficient Funds ${userId} ${_id}`);
        throw new Error(`Insufficient Funds ${userId} ${_id}`);
      }
      return model.update(doc._id, {
        ...doc,
        balance,
      });
    });
};

const queue = (type, userId) => {
  if (!queues[`userBalance:${userId}`]) {
    queues[`userBalance:${userId}`] = createQueue(`userBalance:${userId}`);
    queues[`userBalance:${userId}`].process(({ data: body }) => {
      switch (type) {
        case "add":
          return add(userId, body);
        case "subtract":
          return subtract(userId, body);
      }
    });
  }
  return queues[`userBalance:${userId}`];
};
model.add = (userId, body) =>
  queue("add", userId)
    .add(body)
    .then((job) => job.finished());
model.subtract = (userId, body) =>
  queue("subtract", userId)
    .add(body)
    .then((job) => job.finished());

module.exports = model;

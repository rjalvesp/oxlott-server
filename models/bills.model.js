const R = require("ramda");
const random = require("random");
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
dayjs.extend(utc);
const { model: schema } = require("../schemas/bills.schema");
const userBalanceModel = require("./user-balances.model");
const { db, createQueue } = require("../database");

const model = db.createModel({ type: "bill", design: "bills", schema });

// model.isBlocked = (userId, eventId, data) =>
//   redis
//     .get(`${userId}:${eventId}:${data.join(":")}`)
//     .then(Boolean)
//     .then(R.objOf("isBlocked"));

// model.block = (userId, eventId, data) =>
//   redis
//     .set(`${userId}:${eventId}:${data.join(":")}`, true, {
//       EX: 90,
//       NX: true,
//     })
//     .then(() => model.isBlocked(userId, eventId, data));

// model.unblock = (userId, eventId, data) =>
//   redis
//     .del(`${userId}:${eventId}:${data.join(":")}`)
//     .then(() => model.isBlocked(userId, eventId, data));

const validateTicket = (eventId, data) => {
  return model
    .find({
      selector: {
        event: { _id: eventId },
        data,
      },
    })
    .then(R.propOr([], "data"))
    .then(R.isEmpty);
};
const validateTickets = (eventId, arrayData) =>
  Promise.all(
    arrayData.map((data, index) => {
      return validateTicket(eventId, data).then((isValid) => {
        if (!isValid) {
          return { reason: "Ticket already exists", index };
        }
      });
    })
  ).then(R.reject(R.isNil));

const getData = (body, { canPickElements, elements, minValue, maxValue }) => {
  let data = [];
  if (canPickElements) {
    data = R.pluck("data", body.tickets) || [];
  } else {
    data = R.map(
      () =>
        R.pipe(
          R.range(0),
          R.map(() => random.int(Number(minValue), Number(maxValue))),
          R.sort((a, b) => (a < b ? -1 : 1))
        )(elements),
      body.tickets
    );
  }
  return data;
};

const pickValidTickets = (
  body,
  { canPickElements, elements, minValue, maxValue, eventId }
) => {
  const data = getData(body, { canPickElements, elements, minValue, maxValue });
  return validateTickets(eventId, data).then((errors) => {
    if (!R.isEmpty(errors)) {
      if (canPickElements) {
        return Promise.resolve({
          errors,
        });
      }
      return pickValidTickets(body, {
        canPickElements,
        elements,
        minValue,
        maxValue,
      });
    }
    return Promise.resolve({ data });
  });
};

model.baseCreate = model.create;

const queue = createQueue("BillCreation");

const saveAndUpdateBill = (data, user, event) =>
  Promise.all(
    data.map((newData) =>
      model.baseCreate({
        user,
        event,
        data: newData,
        date: dayjs().utc().format(),
      })
    )
  )
    .then(R.pluck("id"))
    .then((bills) => model.find({ selector: { _id: { $or: bills } } }))
    .then(R.propOr([], "data"))
    .then((bills) => {
      userBalanceModel.subtract(user._id, { bills });
      return bills;
    })
    .then(R.objOf("data"));

queue.process(({ data: body }) => {
  const { event, user } = body;
  const {
    eventType: { canPickElements, elements, minValue, maxValue },
    cost,
  } = event;
  return pickValidTickets(body, {
    canPickElements,
    elements,
    minValue,
    maxValue,
    eventId: event._id,
  }).then(({ errors, data }) => {
    if (errors) {
      return { errors };
    }
    return userBalanceModel
      .find({ selector: { userId: user._id || user.user_id || user.sub } })
      .then(R.pathOr({ balance: 0 }, ["data", 0]))
      .then(({ balance = 0 }) => {
        const decimalBalance = balance / 100;
        if (!decimalBalance || decimalBalance < cost * data.length) {
          return {
            errors: ["Not enough funds"],
          };
        }
        return saveAndUpdateBill(data, user, event);
      });
  });
});
model.create = (body) => queue.add(body).then((job) => job.finished());

module.exports = model;

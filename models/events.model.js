const R = require("ramda");
const random = require("random");
const { model: schema } = require("../schemas/events.schema");
const { db } = require("../database");
const billsModel = require("./bills.model");
const model = db.createModel({ type: "event", design: "events", schema });

model.getEventType = (event) => {
  const eventTypes = require("./event-types.model");
  return eventTypes.getById(R.path(["eventType", "_id"], event));
};

const updateEvent = ({ _id, ...body }, bill) =>
  model.update(
    _id,
    R.pipe(
      R.omit(["_rev"]),
      R.mergeDeepLeft({
        ...body,
        winner: bill ? R.omit(["event"], bill) : null,
      })
    )(body)
  );

const pickAnyBill = (event) => {
  const { _id } = event;
  const {
    minValue = "0",
    maxValue = "1",
    elements = 1,
  } = R.pathOr({}, ["eventType"], event);

  const data = R.range(1, elements).map(() =>
    random.int(Number(minValue), Number(maxValue))
  );
  return billsModel
    .find({ selector: { data, event: { _id } } })
    .then(R.propOr([], ["data"]))
    .then(R.head)
    .then((bill) => updateEvent(event, bill));
};

const forceWinner = (event) => {
  const { _id } = event;
  const { maxValue = "1", elements = 1 } = R.pathOr({}, ["eventType"], event);

  return billsModel
    .find({
      selector: { event: { _id } },
      fields: ["_id"],
      limit: Math.pow(Number(maxValue), elements),
    })
    .then(R.propOr([], ["data"]))
    .then(R.head)
    .then((value) => value[random.int(0, value.length - 1)])
    .then(billsModel.getById)
    .then(updateEvent(event));
};

model.pickWinner = (event) => {
  const { requiresWinner = false } = R.pathOr({}, ["eventType"], event);
  return requiresWinner ? forceWinner(event) : pickAnyBill(event);
};

module.exports = model;

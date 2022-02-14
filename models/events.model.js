const R = require("ramda");
const random = require("ramda");
const { model: schema } = require("../schemas/events.schema");
const { db } = require("../database");
const billsModel = require("./bills.model");
const model = db.createModel({ type: "event", design: "events", schema });

model.pickWinner = (event) => {
  const { _id, ...body } = event;
  const {
    minValue = 0,
    maxValue = 1,
    elements = 1,
  } = R.pathOr({}, ["eventType"], event);
  const data = R.range(1, elements).map(() => random.int(minValue, maxValue));
  billsModel
    .find({ selector: { data } })
    .then(R.propOr([], ["data"]))
    .then(R.head)
    .then((value) =>
      model.update(
        _id,
        R.pipe(
          R.omit(["_rev"]),
          R.mergeDeepLeft({
            data,
            winner: value ? R.omit(["event"], value) : null,
          })
        )(body)
      )
    );
};

module.exports = model;

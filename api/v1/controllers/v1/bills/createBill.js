const R = require("ramda");
const bill = require("../../../../../models/bills.model");

module.exports = ({ body, references: { event, eventType }, userId }) =>
  R.pipe(
    R.mergeDeepLeft({ event: event || {}, eventType: eventType || {}, userId }),
    R.omit(["eventTypeId", "eventId"]),
    bill.create
  )(body);

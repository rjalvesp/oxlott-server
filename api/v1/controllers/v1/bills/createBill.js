const R = require("ramda");
const bill = require("../../../../../models/bills.model");

module.exports = ({ body, references: { event }, user }) =>
  R.pipe(
    R.mergeDeepLeft({
      event,
      user,
    }),
    R.omit(["eventId"]),
    bill.create
  )(body);

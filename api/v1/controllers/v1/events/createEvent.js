const R = require("ramda");
const events = require("../../../../../models/events.model");

module.exports = ({ body, references }) =>
  R.pipe(
    R.mergeDeepLeft({ eventType: references.eventType || {} }),
    R.omit(["eventTypeId"]),
    events.create
  )(body);

const R = require("ramda");
const events = require("../../../../../models/events.model");

module.exports = ({ params: { id }, body, references }) =>
  R.pipe(
    R.mergeDeepLeft({ eventType: references.eventType || {} }),
    R.omit(["eventTypeId"]),
    (body) => events.update(id, body)
  )(body);

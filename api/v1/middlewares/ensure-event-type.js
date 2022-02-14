const R = require("ramda");
const eventTypes = require("../../../models/event-types.model");

module.exports = (path) => (req, res, next) =>
  Promise.resolve(req)
    .then(R.path(path))
    .then(eventTypes.getById)
    .then(
      R.when(R.propEq(true, "disabled"), () => {
        throw new Error("Disabled event type");
      })
    )
    .then((value) => R.assocPath(["references", "eventType"], value, req))
    .then(() => next())
    .catch(() => res.status(400).json({ reason: "Invalid event type" }));

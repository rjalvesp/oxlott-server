const R = require("ramda");
const events = require("../../../models/events.model");

module.exports = (path) => (req, res, next) =>
  Promise.resolve(req)
    .then(R.path(path))
    .then(events.getById)
    .then((value) => R.assocPath(["references", "event"], value, req))
    .then(() => next())
    .catch(() => res.status(400).json({ reason: "Invalid event" }));

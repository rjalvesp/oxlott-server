const R = require("ramda");
const events = require("../../../models/events.model");

module.exports = (path) => (req, res, next) => {
  return Promise.resolve(req)
    .then(R.path(path))
    .then(events.getById)
    .then((event) => (req.references = { ...(req.references || {}), event }))
    .then(() => next())
    .catch(() => res.status(400).json({ reason: "Invalid event" }));
};

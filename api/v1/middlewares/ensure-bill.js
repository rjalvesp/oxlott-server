const R = require("ramda");
const bills = require("../../../models/bills.model");

module.exports = (path) => (req, res, next) =>
  Promise.resolve(req)
    .then(R.path(path))
    .then(bills.getById)
    .then((bill) => (req.references = { ...(req.references || {}), bill }))
    .then(() => next())
    .catch(() => res.status(400).json({ reason: "Invalid bill" }));

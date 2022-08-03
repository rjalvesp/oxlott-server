const R = require("ramda");
const payments = require("../../../models/payments.model");

module.exports = (path) => (req, res, next) =>
  Promise.resolve(req)
    .then(R.path(path))
    .then(payments.getById)
    .then(
      (payment) => (req.references = { ...(req.references || {}), payment })
    )
    .then(() => next())
    .catch(() => res.status(400).json({ reason: "Invalid payment" }));

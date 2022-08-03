const R = require("ramda");
const bills = require("../../../models/bills.model");

module.exports = (req, res, next) => {
  const { user, bill } = req.references;
  if (user._id !== R.path(["user", "_id"], bill)) {
    return res.status(403).json({ reason: "do not own" });
  }
  return next();
};

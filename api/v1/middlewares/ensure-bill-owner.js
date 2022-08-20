const R = require("ramda");

module.exports = (req, res, next) => {
  const { user, bill } = req.references;
  const {
    jwt: { permissions },
  } = req;
  if (
    user._id !== R.path(["user", "_id"], bill) ||
    !R.includes("admin", permissions || [])
  ) {
    return res.status(403).json({ reason: "do not own" });
  }
  return next();
};

const R = require("ramda");

module.exports = (req, res, next) => {
  const {
    jwt: { permissions },
  } = req;
  if (!R.includes("admin", permissions || [])) {
    res.status(403).json("Forbidden");
    return;
  }
  next();
};

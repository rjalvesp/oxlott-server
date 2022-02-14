const R = require("ramda");
const userGetter = require("../../../auth0/user-getter");
const users = require("../../../models/users.model");

module.exports = (req, res, next) => {
  const token = R.pipe(
    R.pathOr("", ["headers", "authorization"]),
    R.split(" "),
    R.last
  )(req);
  userGetter(token)
    .then((user) => {
      req.jwt = req.user;
      req.user = user;
      req.userId = user.user_id || user.sub;
    })
    .then(() => users.getById(req.userId))
    .then(R.when(R.isNil, () => users.create({ _id: req.userId, ...req.user })))
    .then(() => next())
    .catch(() => res.status(401).send("Unauthorized"));
};

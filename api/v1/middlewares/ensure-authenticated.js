const R = require("ramda");
const userGetter = require("../../../auth0/user-getter");
const users = require("../../../models/users.model");

module.exports = (req, res, next) => {
  const token = R.pipe(
    R.pathOr("", ["headers", "authorization"]),
    R.split(" "),
    R.last
  )(req);
  userGetter(token, req.user)
    .then((user) => {
      req.jwt = req.user;
      req.user = user;
      req.userId = user.user_id || user.sub;
    })
    .then(() => users.getById(req.userId))
    .then((storedUser) => (req.user = storedUser))
    .then(R.when(R.isNil, () => users.create({ _id: req.userId, ...req.user })))
    .then(() => next())
    .catch((e) => {
      console.log(e);
      res.status(401).send("Unauthorized");
    });
};

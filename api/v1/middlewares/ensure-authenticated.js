const R = require("ramda");
const userGetter = require("../../../auth0/user-getter");
const users = require("../../../models/users.model");

const userFields = [
  "sub",
  "given_name",
  "family_name",
  "nickname",
  "name",
  "picture",
  "legal_picture",
  "locale",
  "email",
  "email_verified",
  "country",
  "legal_id",
  "legal_verified",
  "bank_account",
];

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
    .then((storedUser) => {
      if (!storedUser) {
        return users.create({
          _id: req.userId,
          ...R.pick(userFields, req.user),
        });
      } else {
        req.user = storedUser;
      }
    })
    .then(() => next())
    .catch(() => res.status(401).send("Unauthorized"));
};

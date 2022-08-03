const R = require("ramda");

module.exports = (req, res, next) => {
  const token = R.pipe(
    R.pathOr("", ["headers", "authorization"]),
    R.split(" "),
    R.last
  )(req);
  if (token !== process.env.AUTH0_TOKEN) {
    return res.status(401).send("Unauthorized");
  }

  next();
};

const { fixId } = require("./helpers");

module.exports =
  ({ db, type }) =>
    (_id) =>
      db
        .get(`${fixId(type, _id)}`)
        .then(({ id, rev }) => db.destroy(`${fixId(type, id)}`, rev));

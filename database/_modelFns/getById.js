const R = require("ramda");
const { fixId } = require("./helpers");

module.exports =
  ({ db, type }) =>
    (_id) =>
      db.get(`${fixId(type, _id)}`).catch(R.always(null));

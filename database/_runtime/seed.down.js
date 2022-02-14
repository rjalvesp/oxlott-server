const R = require("ramda");
const Path = require("path");
const fs = require("fs");
const { seedsDB, db } = require("../index");

const path = Path.resolve(__dirname, "..", "seeds");

module.exports = () =>
  seedsDB
    .list()
    .then(R.propOr([], "rows"))
    .then(R.pluck("id"))
    .then(R.difference(fs.readdirSync(path)))
    .then(async (diff) => {
      for (const _id of diff) {
        const { down } = require(`${path}/${_id}`);
        await down(db).then(() => seedsDB.insert({ _id }));
      }
    });

const R = require("ramda");
const Path = require("path");
const fs = require("fs");
const { migrationsDB, db } = require("../index");

const path = Path.resolve(__dirname, "..", "migrations");

module.exports = () =>
  migrationsDB
    .list()
    .then(R.propOr([], "rows"))
    .then(R.pluck("id"))
    .then(R.difference(fs.readdirSync(path)))
    .then(async (diff) => {
      for (const _id of diff) {
        const { up } = require(`${path}/${_id}`);
        await up(db).then(() => migrationsDB.insert({ _id }));
      }
    });

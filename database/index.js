const Path = require("path");
Promise.resolve(
  require("dotenv").config({
    allowEmptyValues: true,
    path: Path.resolve(process.cwd(), ".env"),
  })
);

const {
  COUCHDB_USER: user,
  COUCHDB_PASSWORD: pwd,
  COUCHDB_NAME: name,
  COUCHDB_PROTOCOL: http,
  COUCHDB_HOST: host,
  COUCHDB_PORT: port,
} = process.env;

const nano = require("nano")(`${http}://${user}:${pwd}@${host}:${port}`);

const db = nano.use(name);

module.exports = {
  db: {
    ...db,
    createModel: require("./model")(db),
  },
  migrationsDB: nano.use("migrations"),
  seedsDB: nano.use("seeds"),
};

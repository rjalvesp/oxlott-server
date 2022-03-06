const Path = require("path");
const Queue = require("bull");

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
  REDIS_HOST: redisHost,
  REDIS_PORT: redisPort,
  REDIS_PASSWORD: redisPass,
} = process.env;

const nano = require("nano")(`${http}://${user}:${pwd}@${host}:${port}`);
const redis = require("redis").createClient(redisPort, redisHost, redisPass);

const db = nano.use(name);
redis.connect();

module.exports = {
  db: {
    ...db,
    createModel: require("./model")(db),
  },
  redis,
  createQueue: (name) =>
    new Queue(name, {
      redis: { port: redisPort, host: redisHost, password: redisPass },
    }),
  migrationsDB: nano.use("migrations"),
  seedsDB: nano.use("seeds"),
};

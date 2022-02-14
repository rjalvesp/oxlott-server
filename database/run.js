const dayjs = require("dayjs");
const fs = require("fs");
const logger = require("../logger");
const { migrateUp, migrateDown, seedUp, seedDown } = require("./_runtime");

const [option, name] = process.argv.slice(2);

const content = `
const logger = require("../../logger");

const up = async (db) => { logger.info(db) };

const down = async (db) => { logger.info(db) };

module.exports = {
  up,
  down,
};
`;

const createFile = (type, name) =>
  fs.writeFile(
    `${__dirname}/${type}/${dayjs().format("YYYYMMDDTHHmmss")}-${name}.js`,
    content,
    function (err) {
      if (err) {
        throw err;
      }
      logger.log("Finished!");
    }
  );

switch (option) {
  case "migration:create": {
    if (!name) {
      logger.log("No name was provided");
      break;
    }
    createFile("migrations", name);
    break;
  }
  case "migration:up": {
    migrateUp();
    break;
  }
  case "migration:down": {
    migrateDown();
    break;
  }
  case "seed:create": {
    if (!name) {
      logger.log("No name was provided");
      break;
    }
    createFile("seeds", name);
    break;
  }
  case "seed:up": {
    seedUp();
    break;
  }
  case "seed:down": {
    seedDown();
    break;
  }
  default:
}

const path = require("path");

require("dotenv-safe").config({
  allowEmptyValues: true,
  path: path.resolve(__dirname, "../.env"),
});

const eventTypeModel = require("../models/event-types.model");

eventTypeModel.exec();

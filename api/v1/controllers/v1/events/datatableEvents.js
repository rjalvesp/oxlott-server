module.exports = ({ body }) =>
  require("../../../../../models/events.model").find(body);

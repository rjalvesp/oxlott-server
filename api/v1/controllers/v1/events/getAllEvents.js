module.exports = ({ query: { limit, skip } }) =>
  require("../../../../../models/events.model").find({
    limit,
    skip,
  });

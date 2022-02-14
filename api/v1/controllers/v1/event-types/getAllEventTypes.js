module.exports = ({ query: { limit, skip } }) =>
  require("../../../../../models/event-types.model").find({
    limit,
    skip,
  });

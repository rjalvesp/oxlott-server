const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
dayjs.extend(utc);

module.exports = ({ query: { limit, skip } }) =>
  require("../../../../../models/events.model").find({
    selector: { to: { $gt: dayjs().utc().format() } },
    limit,
    skip,
  });

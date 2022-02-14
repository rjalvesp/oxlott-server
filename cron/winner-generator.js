const R = require("ramda");
const dayjs = require("dayjs");
const cron = require("node-cron");
const eventsModel = require("../models/events.model");

cron.schedule("*/1 * * * *", () => {
  const date = dayjs().format("YYYY-MM-DDTHH:MM");
  eventsModel
    .find({
      selector: {
        to: {
          $gte: `${date}:00`,
          $lte: `${date}:59`,
        },
      },
      limit: 1000,
    })
    .then(R.propOr([], "data"))
    .then(async (events) => {
      for (const event of events) {
        await eventsModel.pickWinner(event);
      }
    });
});

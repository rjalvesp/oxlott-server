const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
const { v4 } = require("uuid");
const logger = require("../../logger");

dayjs.extend(utc);
const docs = [
  {
    _id: `eventType:${v4()}`,
    name: "Triple",
    elements: 1,
    defaultCost: 20,
    defaultPrize: 1600,
    minValue: "000",
    maxValue: "999",
    type: "eventType",
    frequency: "0 3 */1 * * *",
    at: [
      {
        start: "06:00",
        duration: { hours: 4 },
      },
      {
        start: "10:00",
        duration: { hours: 4 },
      },
      {
        start: "14:00",
        duration: { hours: 4 },
      },
      {
        start: "18:00",
        duration: { hours: 4 },
      },
    ],
    disabled: false,
    createdAt: dayjs().utc().format(),
  },
  {
    _id: `eventType:${v4()}`,
    name: "Triple Double",
    elements: 3,
    defaultCost: 20,
    defaultPrize: 16000,
    minValue: "00",
    maxValue: "99",
    type: "eventType",
    frequency: "0 3 */1 * * *",
    at: [
      {
        start: "09:00",
        duration: { hours: 2 },
      },
      {
        start: "11:00",
        duration: { hours: 2 },
      },
      {
        start: "13:00",
        duration: { hours: 2 },
      },
      {
        start: "15:00",
        duration: { hours: 2 },
      },
      {
        start: "17:00",
        duration: { hours: 2 },
      },
      {
        start: "19:00",
        duration: { hours: 2 },
      },
    ],
    disabled: false,
    createdAt: dayjs().utc().format(),
  },
  {
    _id: `eventType:${v4()}`,
    name: "BFP",
    elements: 5,
    defaultCost: 20,
    defaultPrize: 1600000,
    minValue: "000",
    maxValue: "999",
    type: "eventType",
    frequency: "0 3 0 * * 1",
    at: [
      {
        start: "09:00",
        duration: { days: 6, hours: 8 },
      },
    ],
    disabled: false,
    createdAt: dayjs().utc().format(),
  },
];

const up = async (db) => {
  return db.bulk({ docs });
};

const down = async (db) => {
  logger.info(db);
};

module.exports = {
  up,
  down,
};

const R = require("ramda");
const cron = require("node-cron");
const dayjs = require("dayjs");
const dayjsDuration = require("dayjs/plugin/duration");
const dayjsUtc = require("dayjs/plugin/utc");

const { model: schema } = require("../schemas/event-types.schema");
const { db } = require("../database");
const eventModel = require("./events.model");

dayjs.extend(dayjsDuration);
dayjs.extend(dayjsUtc);

const model = db.createModel({
  type: "eventType",
  design: "eventTypes",
  schema,
});

model.oldCreate = model.create;
model.oldUpdate = model.update;

let cronJobs = [];

const findEventByTypeAndDate = ({ eventTypeId, from, to }) =>
  eventModel
    .find({ selector: { from, to, eventType: { _id: eventTypeId } } })
    .then(R.prop("filteredTotal"))
    .then(Boolean);

const getFromTo = (duration, hour, minute) => {
  const fromDate = dayjs()
    .set("hour", hour)
    .set("minute", minute)
    .set("second", 0)
    .utc();
  return {
    from: fromDate.format(),
    to: fromDate.add(dayjs.duration(duration)).format(),
  };
};

const trySaveEvent = async (eventType, { start, duration }) => {
  const {
    _id: eventTypeId,
    defaultCost: cost,
    defaultPrize: prize,
    name,
  } = eventType;
  const [hour = 0, minute = 0] = (start || "").split(":");
  const { from, to } = getFromTo(duration, hour, minute);
  const exists = await findEventByTypeAndDate({
    eventTypeId,
    from,
    to,
  });
  if (exists) {
    return;
  }
  return eventModel.create({
    cost,
    prize,
    name,
    from,
    disabled: false,
    to,
    eventType,
  });
};

const generateEventByEventType = async (eventType) => {
  const { at, frequency, disabled } = eventType;

  if (disabled) {
    return;
  }

  const cronJob = cron.schedule(frequency, async () => {
    for (const row of at || []) {
      await trySaveEvent(eventType, row);
    }
  });
  cronJobs.push(cronJob);
};

const afterCreate = ({ _id }) =>
  model.getById(_id).then(generateEventByEventType);

const afterUpdate = () => {
  for (const cronJob of cronJobs) {
    cronJob.stop();
  }
  cronJobs = [];

  model
    .find({ limit: 1000 })
    .then(R.propOr([], "data"))
    .then(async (eventTypes) => {
      for (const eventType of eventTypes) {
        await generateEventByEventType(eventType);
      }
    });
};

model.create = (body) => model.oldCreate(body).then(afterCreate);
model.update = (_id, body) => model.oldUpdate(_id, body).then(afterUpdate);
model.exec = afterUpdate;

module.exports = model;

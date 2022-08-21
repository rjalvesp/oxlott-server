const R = require("ramda");
const { redis } = require("../database");
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
dayjs.extend(utc);

const checkIfTagSet = (tag) => redis.get(tag).then(Boolean).catch(R.F);
const setTag = (tag, value) => redis.set(tag, value || 1);
const increaseTag = (tag) => redis.incr(tag);

const increase = (tag) =>
  checkIfTagSet(tag).then((isSet) => (isSet ? increaseTag(tag) : setTag(tag)));

redis.set(dayjs().utc().format("YYYY-MM-DD HH:mm:ss.SSS"), 1);
module.exports = {
  increaseOverTime: (tag) => {
    const date = dayjs().utc();
    return Promise.all([
      increase(`stat:${tag}:over-time:${date.format("YYYY")}`),
      increase(`stat:${tag}:over-time:${date.format("YYYY-MM")}`),
      increase(`stat:${tag}:over-time:${date.format("YYYY-MM-DD")}`),
      increase(`stat:${tag}:over-time:${date.format("YYYY-MM-DD HH")}`),
    ]);
  },
  setOverTime: () => {
    // TODO
    // const date = dayjs().utc();
    // return Promise.all([
    //   increase(`stat:${tag}:over-time:${date.format("YYYY")}`, value),
    //   increase(`stat:${tag}:over-time:${date.format("YYYY-MM")}`, value),
    //   increase(`stat:${tag}:over-time:${date.format("YYYY-MM-DD")}`, value),
    //   increase(`stat:${tag}:over-time:${date.format("YYYY-MM-DD HH")}`, value),
    // ]);
  },
};

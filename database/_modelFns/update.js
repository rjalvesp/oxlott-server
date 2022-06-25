const R = require("ramda");
const Joi = require("joi");
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
dayjs.extend(utc);

const { fixId } = require("./helpers");

module.exports =
  ({ db, overrideId, schema, type }) =>
  (_id, body) =>
    R.pipe(
      (value) => Joi.object(schema).validate(value),
      R.prop("value"),
      (value) =>
        db
          .get(`${fixId(type, _id)}`)
          .then(
            ({
              createdAt,
              _rev,
              ...oldValue
            }) =>
              db.insert({
                ...oldValue,
                ...value,
                _id: overrideId ? `${fixId(type, _id)}` : `${type}:${_id}`,
                type,
                createdAt,
                _rev
              })
          )
    )(body);

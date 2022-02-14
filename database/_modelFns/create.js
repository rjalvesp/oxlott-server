const R = require("ramda");
const Joi = require("joi");
const { v4 } = require("uuid");
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
dayjs.extend(utc);

const { fixId } = require("./helpers");

const saveArray = ({ db, overrideId, schema, type }) =>
  R.pipe(
    R.map(
      R.pipe(
        (value) => Joi.object(schema).validate(value),
        R.prop("value"),
        R.ifElse(
          () => R.equals(true, !!overrideId),
          (body) => db.insert({ ...body, type, _id: `${type}:${body._id}` }),
          (body) => db.insert({ ...body, _id: `${fixId(type, v4())}`, type })
        )
      )
    ),
    R.objOf("docs"),
    db.bulk
  );

const saveObject = ({ db, overrideId, schema, type }) =>
  R.pipe(
    (value) => Joi.object(schema).validate(value),
    R.prop("value"),
    R.ifElse(
      () => R.equals(true, !!overrideId),
      (body) =>
        db.insert({
          ...body,
          createdAt: dayjs().utc().format(),
          type,
          _id: `${type}:${body._id}`,
        }),
      (body) =>
        db.insert({
          ...body,
          createdAt: dayjs().utc().format(),
          _id: `${fixId(type, v4())}`,
          type,
        })
    )
  );

module.exports = ({ db, overrideId, schema, type }) =>
  R.ifElse(
    R.is(Array),
    saveArray({ db, overrideId, schema, type }),
    saveObject({ db, overrideId, schema, type })
  );

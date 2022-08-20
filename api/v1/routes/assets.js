const R = require("ramda");
const Joi = require("joi");
const router = require("express").Router();
const Stream = require("stream");
const { v4 } = require("uuid");
const mime = require("mime-types");

const ExpressJoi = require("express-joi-validation").createValidator({});

const ensureAuthenticated = require("../middlewares/ensure-authenticated");
const tokenValidator = require("../../../auth0/token-validator");

const { controller: assetSchema } = require("../../../schemas/assets.schema");
const storage = require("../../../storage");

const bufferToStream = (buffer) => {
  const stream = new Stream.Duplex();
  stream.push(buffer);
  stream.push(null);
  return stream;
};

router.post(
  "/:folder",
  tokenValidator,
  ensureAuthenticated,
  ExpressJoi.body(Joi.object(assetSchema)),
  (req, res) => {
    const { content, type } = req.body;
    const { folder } = req.params;
    const Key = `${folder}/${v4()}.${mime.extension(type)}`;
    storage.save(Key, content).then(() => res.status(201).json({ Key }));
  }
);

router.get("/*", (req, res) => {
  const key = R.pipe(R.values, R.head)(req.params);
  const { attachment } = req.query;
  storage
    .read(key)
    .then(({ Body }) => {
      res.set(
        "Content-Disposition",
        `${
          attachment && attachment !== "false" ? "attachment" : "inline"
        }; filename=${key}`
      );
      res.set("Content-Type", mime.contentType(key));
      bufferToStream(Body).pipe(res);
    })
    .catch(() => res.status(500).json({ reason: "Failed to retrieve asset" }));
});

module.exports = router;

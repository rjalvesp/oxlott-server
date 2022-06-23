const Joi = require("joi");
const router = require("express").Router();
const Stream = require("stream");
const { v4 } = require("uuid");
const mime = require("mime-types");

const ExpressJoi = require("express-joi-validation").createValidator({});

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
  ExpressJoi.body(Joi.object(assetSchema)),
  (req, res) => {
    const { content, type } = req.body;
    const {
      user: { email },
    } = req.user;
    const { folder } = req.params;
    const Key = `${email}/${folder}/${v4()}.${mime.extension(type)}`;
    storage.save(Key, content).then(() => res.status(201).json({ Key }));
  }
);

router.get("/:key", (req, res) => {
  const { key } = req.params;
  const { attachment } = req.query;
  storage.read(key).then(({ Body }) => {
    res.set(
      "Content-Disposition",
      `${
        attachment && attachment !== "false" ? "attachment" : "inline"
      }; filename=${key}`
    );
    res.set("Content-Type", mime.contentType(key));
    bufferToStream(Body).pipe(res);
  });
});

module.exports = router;

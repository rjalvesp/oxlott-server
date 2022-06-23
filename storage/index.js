const AWS = require("aws-sdk");

const {
  AWS_S3_REGION: region,
  AWS_ACCESS_KEY_ID: accessKeyId,
  AWS_SECRET_ACCESS_KEY: secretAccessKey,
  AWS_S3_BUCKET: Bucket,
  AWS_S3_ACL: ACL,
} = process.env;

AWS.config.update({
  accessKeyId,
  secretAccessKey,
  region,
});

const s3 = new AWS.S3();

module.exports = {
  read: (Key) => s3.getObject({ Key, Bucket }).promise(),
  save: (Key, content) =>
    s3
      .putObject({ Bucket, Key, ACL, Body: Buffer.from(content, "base64") })
      .promise(),
};

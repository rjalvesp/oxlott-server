const R = require("ramda");
const Path = require("path");
const fs = require("fs");
const axios = require("axios");
const logger = require("../logger");

const {
  AUTH0_DOMAIN: domain,
  AUTH0_CLIENT_ID: client_id,
  AUTH0_CLIENT_SECRET: client_secret,
} = (module.exports = () => {
  axios
    .post(`${domain}/oauth/token`, {
      client_id,
      client_secret,
      audience: `${domain}/api/v2/`,
      grant_type: "client_credentials",
    })
    .then(R.path(["data", "access_token"]))
    .then(R.objOf("auth0"))
    .then((value) =>
      fs.writeFileSync(
        Path.resolve(__dirname, "./token.json"),
        JSON.stringify(value, null, 2)
      )
    )
    .catch(logger.error);
});

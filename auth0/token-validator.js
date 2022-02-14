const jwt = require("express-jwt");
const jwks = require("jwks-rsa");

const { AUTH0_DOMAIN: domain, AUTH0_AUDIENCE: audience } = process.env;

module.exports = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${domain}/.well-known/jwks.json`,
  }),
  audience,
  issuer: `${domain}/`,
  algorithms: ["RS256"],
});

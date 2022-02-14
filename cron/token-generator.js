const cron = require("node-cron");
const tokenGenerator = require("../auth0/machine-token-generator");
cron
  .schedule("* */6 * * *", () => {
    tokenGenerator();
  })
  .start();

const createError = require("http-errors");
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const tokenValidator = require("./auth0/token-validator");
const routes = require("./api/v1");

const app = express();
app.use(cors());

app.use(helmet());
app.use(tokenValidator);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(handleApiError);
app.get("/", (req, res) => res.status(200).json({ alive: true }));
app.use("/api/v1", routes);

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Handle errors manually
app.use(function (err, req, res) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

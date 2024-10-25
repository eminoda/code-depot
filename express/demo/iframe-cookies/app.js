"use strict";
const express = require("express");
const healthRouter = require("./routes/health");
const app = express();

app.use(express.json());
app.use((req, res, next) => {
  // 在 iframe 下，设置 cookie 必须加上 SameSite=None;Secure
  res.setHeader("Set-Cookie", "X-Ticket=hello; Path=/;Domain=127.0.0.1;SameSite=None;Secure;");
  express.static("public")(req, res, next);
});

app.use("/health", healthRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({ code: -1, msg: err.message });
});

module.exports = app;

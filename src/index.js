const express = require("express"),
  path = require("path");
const app = express();

const isDev = (process.env.NODE_ENV || "development") === "development";

if (isDev) {
  require("./developmentHelpers");
}

app.use("/", express.static(path.join(__dirname, "..", "dist")));

app.listen(8161, () => console.log("Server listening on port :8161"));

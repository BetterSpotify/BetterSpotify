const express = require("express"),
  cors = require("cors"),
  path = require("path");
const app = express();

const isDev = (process.env.NODE_ENV || "development") === "development";

if (isDev) {
  require("./developmentHelpers");
  app.use(cors());
}

app.use("/", express.static(path.join(__dirname, "..", "dist")));

app.listen(8161, () => console.log("Server listening on port :8161"));

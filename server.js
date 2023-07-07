// Get dependencies
var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const http = require("http");
const debug = require("debug")("node-angular");
const mongoose = require("mongoose");

var index = require("./server/routes/index");

// establish a connection to the mongo database
mongoose
  .connect("mongodb://127.0.0.1:27017/familySchedule", { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Connection failed: " + err));

// an instance of express
var app = express();

// parsers for POST data
app.use(
  bodyParser.json(),
  bodyParser.urlencoded({ extended: false }),
  cookieParser(),
  logger("dev")
);
// Add header support for CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  // console.log("Time: ", Date.now());
  next();
});

// use the specified director as the root directory
app.use(express.static(path.join(__dirname, "dist/family-schedule")));
app.use("/", index);

// non defined paths return to index
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/family-schedule/index.html"));
});

const normalizePort = (val) => {
  var port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

const onError = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }

  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
  debug("listening on " + bind);
};

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const server = http.createServer(app);
server.on("error", onError);
server.on("listening", onListening);

server.listen(port, () =>
  console.log(`API running on http://127.0.0.1:${port}/`)
);

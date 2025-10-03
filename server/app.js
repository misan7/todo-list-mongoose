const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const routerTasks = require("./routes/tasks");
const routerTask = require("./routes/task");

const apiKey = require("./routes/middlewares/apikey");
const routerbodyParser = require("./routes/middlewares/bodyParser");

// const dbUrl = 'mongodb://localhost:27017/test'
// const PORT = 3000
// npm install dotenv --save-dev

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const DB_URL = process.env.DB_URL || "mongodb://localhost:27017/test";
const PORT = parseInt(process.env.PORT, 10) || 3000;

const app = express();

mongoose.Promise = Promise;

// Connect to MongoDB with recommended options and fail fast if unreachable
const mongooseOpts = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // Shorten server selection timeout so startup fails quickly when the DB is unreachable
  serverSelectionTimeoutMS: 5000,
};

mongoose
  .connect(DB_URL, mongooseOpts)
  .then(() => {
    console.log("Connected to MongoDB");

    // Start the HTTP server only after DB connection is established
    const server = app.listen(PORT, () => {
      console.log(`Doing Ninja Things on PORT ${PORT}`);
    });

    server.on("error", (err) => {
      if (err && err.code === "EADDRINUSE") {
        console.error(
          `Port ${PORT} is already in use. Choose a different PORT or stop the process using it.`
        );
        process.exit(1);
      }
      console.error("Server error:", err);
      process.exit(1);
    });
  })
  .catch((err) => {
    console.error(
      "MongoDB connection error:",
      err && err.message ? err.message : err
    );
    console.error(
      "Server will not start until the database connection is available."
    );
    process.exit(1);
  });

app.use(express.static(path.join(__dirname, "../client")));
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.locals.moment = require("moment");

// app.use(apiKey)
app.use(routerbodyParser);
app.use("/tasks", routerTasks);
app.use("/task", routerTask);

app.get("/", (req, res) => res.redirect("/tasks"));

// Server is started after successful DB connection above

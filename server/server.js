const express = require("express");
// const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const config = require("./app/config");
const app = express();
const mongoose = require('./app/models/db');//mongodb

app.use(cors({ exposedHeaders: ["x-auth-token"] }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

require("./routes/requests.route")(app);
require("./routes/auth.route")(app);
require("./routes/users.route")(app);
require("./routes/residents.route")(app);
require("./routes/shop.route")(app);
require("./routes/managers.route")(app);
require("./routes/posts.route")(app);

app.listen(config.SERVER.PORT, function () {
  console.log("Environment", process.env.NODE_ENV);
  console.log(`API running on port ${config.SERVER.PORT}`);
});

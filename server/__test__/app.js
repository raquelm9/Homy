const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
require("../routes/requests.route")(app);
require("../routes/auth.route")(app);
require("../routes/users.route")(app);
require("../routes/residents.route")(app);
require("../routes/shop.route")(app);
require("../routes/managers.route")(app);

module.exports = app;
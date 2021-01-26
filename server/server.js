const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();


const dotenv = require('dotenv');
dotenv.config();

app.use(cors({ exposedHeaders: ["x-auth-token"] }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));



mongoose
  .connect("mongodb://localhost/homy", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDb...", err));

require("./routes/requests.route")(app);
require("./routes/auth.route")(app);
require("./routes/users.route")(app);
require("./routes/residents.route")(app);
require("./routes/shop.route")(app);
require("./routes/managers.route")(app);

const port = process.env.PORT || 3008;

app.listen(port, function () {
  console.log(`API running on port ${port}`);
});

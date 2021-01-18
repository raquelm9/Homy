const mongoose = require("mongoose");

const schema = mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  type: String,
  subject: String,
  description: String,
  image_path: String,
  status: Boolean,
  image: String,
  request_number: Number
});

const Request = mongoose.model("request", schema);
module.exports = Request;

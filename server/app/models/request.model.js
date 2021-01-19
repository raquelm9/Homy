const mongoose = require("mongoose");

const schema = mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  type: String,
  subject: String,
  description: String,
  status: Boolean,
  image: String,
  request_number: Number,
  unit_num: String,
  resident_name: String
});

const Request = mongoose.model("request", schema);
module.exports = Request;

const mongoose = require("mongoose");
// const Joi = require("joi");

const schema = mongoose.Schema({
  date: {
    type: String,
    required: false,
  },
  username: String, 
  image: String,
  title: String,
  announcement: String,
//   isManager: Boolean
  
});

exports.Announcement = mongoose.model("announcement", schema);
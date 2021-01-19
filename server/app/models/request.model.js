const mongoose = require("mongoose");
const Joi = require('joi');

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



function validateRequest(request) {

  const schema = Joi.object({
    date: Joi.string().required(),
    type: Joi.string().required(),
    subject: Joi.string().required(),
    description: Joi.string().required(),
    status: Joi.boolean(),
    image: Joi.string(),
    request_number: Joi.number(),
    unit_num: Joi.string(),
    resident_name: Joi.string()
  });

  return Joi.validate(request, schema);

}
exports.Request = Request;
exports.validate = validateRequest;

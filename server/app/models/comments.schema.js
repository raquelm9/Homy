const mongoose = require("mongoose");
const Joi = require("joi");

const schema = mongoose.Schema(
  {
    comment: { type: String },
    name: { type: String },
  },
  { timestamps: true }
);

exports.validateComment = function validateComment(comment) {
  const schema = Joi.object({
    comment: Joi.string().required(),
    name: Joi.string().required(),
  });

  return schema.validate(comment);
};

exports.Comment = schema;

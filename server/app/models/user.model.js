const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

const schema = mongoose.Schema({
  email: {
    type: String,
    minlength: 5,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isManager: Boolean
});

schema.methods.generateAuthToken = function () {
  // const token = jwt.sign({ _id: user._id }, config.get('jwtPrivateKey'));
  const token = jwt.sign({ _id: this._id, isManager: this.isManager || false }, "jwtPrivateKey");
  return token;
};

exports.User = mongoose.model("user", schema);

exports.validate = function validateUser(user) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(5),
    isManager: Joi.boolean()
  });
  return schema.validate(user);
};

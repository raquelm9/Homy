const mongoose = require("mongoose");
const Joi = require("joi");

const schema = mongoose.Schema(
    {
        iv: { type: String, required: true },
        content: { type: String, required: true }
    },
    { timestamps: true }
);


exports.Token = mongoose.model('token', schema);
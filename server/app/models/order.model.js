const mongoose = require("mongoose");
const Joi = require("joi");

const schema = mongoose.Schema(
    {
        unit_num: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

exports.Order = mongoose.model("order", schema);

exports.validateOrder = function validateOrder(order) {
    const schema = Joi.object({
        unit_num: Joi.string().required(),
        name: Joi.string().required(),
        type: Joi.string().required()
    });
    return schema.validate(order);
};

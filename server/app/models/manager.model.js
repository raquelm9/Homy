const mongoose = require('mongoose');
const Joi = require('joi');

const schema = mongoose.Schema(
    {
        name: String,
        user_id: String,
        building_id: String
    }
)

exports.Manager = mongoose.model('manager', schema);

exports.validateManager = function validateManager(manager) {

    const schema = Joi.object({
        name: Joi.string().required(),
        user_id: Joi.string().required(),
        building_id: Joi.string().required()
    })
    return schema.validate(manager);
}
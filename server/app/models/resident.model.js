const mongoose = require('mongoose');
const Joi = require('joi');

const schema = mongoose.Schema(
    {
        unit_num: String,
        email: String,
        name: String
    }
)

exports.Resident = mongoose.model('resident', schema);





exports.validate = function validateResident(resident) {

    const schema = Joi.object({
        unit_num: Joi.string().required(),
        email: Joi.string().required(),
        name: Joi.string().required()
    })
    return schema.validate(resident);
}
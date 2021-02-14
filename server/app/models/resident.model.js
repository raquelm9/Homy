const mongoose = require('mongoose');
const Joi = require('joi');

const schema = mongoose.Schema(
    {
        unit_num: String,
        email: String,
        name: String,
        user_id: String,
        phone: String,
        notification_active: { type: Boolean, default: false },
        notification_req_id: { type: Array, default: null }
    }
)

exports.Resident = mongoose.model('resident', schema);

exports.validate = function validateResident(resident) {

    const schema = Joi.object({
        unit_num: Joi.string().required(),
        email: Joi.string().required(),
        name: Joi.string().required(),
        user_id: Joi.string(),
        phone: Joi.string()
    })
    return schema.validate(resident);
}
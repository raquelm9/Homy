const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { required } = require('joi');

const schema = mongoose.Schema(
    {
        email: {
            type: String,
            minlength: 5,
            unique: true,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    }
)

schema.methods.generateAuthToken = function () {
    // const token = jwt.sign({ _id: user._id }, config.get('jwtPrivateKey'));
    const token = jwt.sign({ _id: this._id }, "jwtPrivateKey");
    return token;
}

const User = mongoose.model('user', schema);

module.exports = User;

exports.validate = function validateUser(user) {

    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(5)
    })
    return schema.validate(user);

}
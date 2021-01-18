const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

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
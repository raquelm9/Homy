const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const schema = mongoose.Schema(
    {
        type: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
)

schema.methods.generateNotificationToken = function () {
    // const token = jwt.sign({ _id: user._id }, config.get('jwtPrivateKey'));
    const token = jwt.sign({ _id: this._id }, "jwtPrivateKey");
    return token;
};

exports.Notification = mongoose.model('notification', schema);


const mongoose = require('mongoose');

const schema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        count: {
            type: Number,
            required: true
        }
    }
)

const Counter = mongoose.model('counter', schema);

module.exports = Counter;
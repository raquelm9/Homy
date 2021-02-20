const mongoose = require("mongoose");

const schema = mongoose.Schema(
    {
        long_url: {
            type: String,
            required: true,
        },
        short_url: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true
    }
);

exports.Order = mongoose.model("shortUrl", schema);


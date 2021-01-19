const mongoose = require('mongoose');

const schema = mongoose.Schema(
    {
        login_id: String,
        unit_num: String,
        email: String,
        name: String,
    }
)

const Resident = mongoose.model('resident', schema);

module.exports = Resident;
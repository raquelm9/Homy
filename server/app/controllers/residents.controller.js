const mongoose = require('mongoose');
const { Resident, validate } = require('../models/resident.model');

exports.createAccount = (req, res) => {

    const result = validate(req.body);

    if (result.error) {
        return res.status(400).send(result.error.details[0].message)
    }

    const resident = new Resident({
        unit_num: req.body.unit_num,
        email: req.body.email,
        name: req.body.name
    });

    resident.save().then((data) => res.send(data));

}

exports.getResidents = (req, res) => {


    Resident
        .find()
        .then(data => res.send(data))
}
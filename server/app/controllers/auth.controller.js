const { User } = require('../models/user.model');
const { Resident } = require('../models/resident.model');

const _ = require('lodash');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { findById } = require('../models/user.model');

exports.login = async (req, res) => {

    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(5)
    })
    const result = schema.validate(req.body)

    if (result.error) {
        return res.status(400).send(result.error.details[0].message)
    }

    let user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(400).send('Invalid email or password.')

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid email or password.')

    let resident = await Resident.findOne({ user_id: user._id })//
    if (!resident) return res.status(400).send("This user don't have an account yet.")

    user.unit_num = resident.unit_num;
    user.name = resident.name;


    const token = user.generateAuthToken();

    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'email', 'name', 'unit_num']))
}

exports.verifyUser = async (req, res) => {

    const token = req.header('x-auth-token')

    const decoded = jwt.verify(token, "jwtPrivateKey")

    let user = await User.findById(decoded._id)

    let resident = await Resident.findOne({ user_id: user._id })
    if (!resident) return res.status(400).send("This user don't have an account yet.")

    user.unit_num = resident.unit_num;
    user.name = resident.name;

    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'email', 'unit_num', 'name']))
}
const User = require('../models/user.model');
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

    const token = user.generateAuthToken();

    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'email']))
}

exports.verifyUser = async (req, res) => {

    const token = req.headers.authorization.slice(7)


    const decoded = jwt.verify(token, "jwtPrivateKey")

    let user = await User.findById(decoded._id)


    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'email']))
}
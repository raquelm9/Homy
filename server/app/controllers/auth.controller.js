const { User } = require("../models/user.model");
const { Resident } = require("../models/resident.model");
const { Manager } = require("../models/manager.model");

const _ = require("lodash");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require('../config');

exports.login = async (req, res) => {

  try {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(5),
    });

    const result = schema.validate(req.body);

    if (result.error) {
      return res.status(400).send(result.error.details[0].message);
    }

    let user = await User.findOne({ email: req.body.email });

    if (!user) return res.status(400).send({ error: "Invalid email or password." });

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send("Invalid email or password.");

    if (user.isManager) {
      let manager = await Manager.findOne({ user_id: user._id });

      if (!manager)
        return res.status(400).send("This manager doesn't have an account yet.");
      user.name = manager.name;
      user.building_id = manager.building_id;

      const token = user.generateAuthToken();

      return res
        .header("x-auth-token", token)
        .send(_.pick(user, ["_id", "email", "name", "building_id", "isManager"]));
    }

    let resident = await Resident.findOne({ user_id: user._id }); //

    if (!resident)
      return res.status(400).send("This user don't have an account yet.");

    user.unit_num = resident.unit_num;
    user.name = resident.name;

    const token = user.generateAuthToken();

    res
      .header("x-auth-token", token)
      .send(_.pick(user, ["_id", "email", "name", "unit_num"]));
  } catch (err) {
    console.log(err)
    return res.sendStatus(500)
  }

};

exports.verifyUser = async (req, res) => {
  try {
    const token = req.header("x-auth-token");

    const decoded = jwt.verify(token, config.JWT.SECRET_KEY);

    let user = await User.findById(decoded._id);

    if (!user.isManager) {//login as resident
      let resident = await Resident.findOne({ user_id: user._id });
      if (!resident)
        return res.status(400).send("This user don't have an account yet.");

      user.unit_num = resident.unit_num;
      user.name = resident.name;
      res
        .header("x-auth-token", token)
        .send(_.pick(user, ["_id", "email", "unit_num", "name"]));
    } else {//login as manager
      let manager = await Manager.findOne({ user_id: user._id });

      if (!manager) {
        return res.status(400).send("This user don't have an account yet.");
      }

      user.building_id = manager.building_id;
      user.name = manager.name;

      res
        .header("x-auth-token", token)
        .send(_.pick(user, ["_id", "isManager", "name", "building_id"]));
    }
  } catch (err) {
    console.log(err)
    return res.sendStatus(500)
  }

};

// exports.loginAsManager = async (req, res) => {
//   const schema = Joi.object({
//     email: Joi.string().email().required(),
//     password: Joi.string().min(5),
//   });

//   const result = schema.validate(req.body);

//   if (result.error) {
//     return res.status(400).send(result.error.details[0].message);
//   }

//   let user = await User.findOne({ email: req.body.email });

//   if (!user) return res.status(400).send("Invalid email or password.");
//   if (!user.isManager) return res.status(403).send("Forbidden");

//   const validPassword = await bcrypt.compare(req.body.password, user.password);
//   if (!validPassword) return res.status(400).send("Invalid email or password.");

//   let manager = await Manager.findOne({ user_id: user._id }); //

//   if (!manager)
//     return res.status(400).send("This user don't have an account yet.");

//   user.building_id = manager.building_id;
//   user.name = manager.name;

//   const token = user.generateAuthToken();

//   res
//     .header("x-auth-token", token)
//     .send(_.pick(user, ["_id", "isManager", "name", "building_id"]));
// };

const _ = require("lodash");
const { User, validate } = require("../models/user.model");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  try {
    const result = validate(req.body);

    if (result.error) {
      return res.status(400).send(result.error.details[0].message);
    }

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send({ error: "User already registered." });

    const isManager = req.body.isManager || false

    user = new User({
      email: req.body.email,
      password: req.body.password,
      isManager: isManager
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    const token = user.generateAuthToken();
    res.header("x-auth-token", token).send(_.pick(user, ["_id", "email", "isManager"]));
  } catch (err) {
    console.log(err)
    return res.sendStatus(500)
  }

};

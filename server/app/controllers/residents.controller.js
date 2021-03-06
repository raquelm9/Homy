const { Resident, validate } = require("../models/resident.model");

exports.createAccount = (req, res) => {

  const result = validate(req.body);

  if (result.error) {
    return res.status(400).send({ error: "Failed validation" });
  }

  const resident = new Resident({
    unit_num: req.body.unit_num,
    name: req.body.name,
    email: req.body.email,
    user_id: req.body.user_id,
    phone: req.body.phone,
  });

  resident
    .save()
    .then((data) => res.send(data))
    .catch(err => {
      console.log(err)
      return res.sendStatus(500)
    })
};

exports.getResidents = (req, res) => {
  Resident.find().then((data) => res.send(data));
};

exports.deleteOne = async (req, res) => {
  try {
    const residentId = req.params.id;

    let resident = await Resident.findById(residentId);
    if (!resident) return res.status(404).send("The resident was not find");

    resident = await Resident.deleteOne({ _id: residentId });
    if (!resident) return resstatus(404).send("The resident was not find");

    res.send(resident);
  } catch (err) {
    console.log(err)
    return res.sendStatus(500)
  }

};

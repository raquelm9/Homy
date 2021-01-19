const { Request, validate } = require("../models/request.model");
const Counter = require("../models/counter.model");

const fs = require('fs');
const { result } = require("lodash");
// var serviceRequests = [
//     {
//         id: "1",
//         date: "Sep 12 2020",
//         type: "ELECTRICITY",
//         subject: "Complaints/Noise",
//         description: "My neighbor makes a lot of noise at night and I can't sleep",
//     },
//     {
//         id: "2",
//         date: "Sep 12 2020",
//         type: "ELECTRICITY",
//         subject: "Plumbing/ Bath Tub Drains",
//         description: "My bathtub is not draining properly",
//     },
//     {
//         id: "3",
//         date: "Sep 12 2020",
//         type: "ELECTRICITY",
//         subject: "Doors & Locks",
//         description: "I lost my key and I can't get into my apartment",
//     },
// ];

exports.getRequest = (req, res) => {
  Request.find().then((data) => res.send(data));
};

exports.createRequest = async (req, res) => {
  const file = req.file;
  const path = file ? file.path : undefined;

  const result = validate(req.body);
  if (result.error) {
    return res.status(400).send(result.error.details[0].message)
  }

  let counter = await Counter.findOneAndUpdate({ name: 'request_number' }, { $inc: { count: 1 } }).exec();

  if (!counter) {//create first counter if none
    counter = new Counter({
      name: 'request_number',
      count: 0
    })
  }



  const request = new Request({
    date: req.body.date,
    type: req.body.type,
    subject: req.body.subject,
    description: req.body.description,
    status: req.body.status,
    image: path,
    request_number: counter.count,
    unit_num: req.body.unit_num,
    resident_name: req.body.resident_name
  });


  request.save().then((data) => res.send(data));
};





exports.deleteRequest = async (req, res) => {

  const serviceRequestId = req.params.id;
  let request = await Request.findById(serviceRequestId)
  if (!request) return res.status(404).send('The request was not find');

  //erase image on the server if one
  if (request.image) {
    fs.unlink(`./${request.image}`, (err) => {
      if (err) console.log(err);
    });
  }
  request = await Request.deleteOne({ _id: serviceRequestId })
  if (!request) return resstatus(404).send('The request was not find');

  res.send(request)
};
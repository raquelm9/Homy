const Request = require("../models/request.model");
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

exports.createRequest = (req, res) => {
  const file = req.file;
  const path = file ? file.path : undefined;

  const request = new Request({
    date: req.body.date,
    type: req.body.type,
    subject: req.body.subject,
    description: req.body.description,
    status: req.body.status,
    image: path,
  });

  request.save(request).then((data) => res.send(data));
};





exports.deleteRequest = (req, res) => {

  const serviceRequestId = req.params.id;


  Request
    .deleteOne({ _id: serviceRequestId })
    .then(data => res.send(data))
    .catch(err => console.log(err))

};
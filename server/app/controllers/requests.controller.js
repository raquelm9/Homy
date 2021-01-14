const Request = require('../models/request.model');
var serviceRequests = [
    {
        id: "1",
        date: "Sep 12 2020",
        type: "ELECTRICITY",
        subject: "Complaints/Noise",
        description: "My neighbor makes a lot of noise at night and I can't sleep",
    },
    {
        id: "2",
        date: "Sep 12 2020",
        type: "ELECTRICITY",
        subject: "Plumbing/ Bath Tub Drains",
        description: "My bathtub is not draining properly",
    },
    {
        id: "3",
        date: "Sep 12 2020",
        type: "ELECTRICITY",
        subject: "Doors & Locks",
        description: "I lost my key and I can't get into my apartment",
    },
];

exports.createRequest = (req, res) => {

    const request = new Request({
        date: req.body.date,
        type: req.body.type,
        subject: req.body.subject,
        description: req.body.description,
        status: req.body.status
    })

    request
        .save(request).then(data => res.send(data))
    // const newService = req.body;
    // if (
    //     !newService ||
    //     newService.date === "" ||
    //     newService.type === "" ||
    //     newService.subject === "" ||
    //     newService.description === ""
    // ) {
    //     res.status(404).send({
    //         error: "Please enter all required information",
    //     });
    // } else {
    //     serviceRequests.push(newService);
    //     res.status(200).send(serviceRequests);
    // }

};
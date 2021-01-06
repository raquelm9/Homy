const express = require("express");
const app = express();

const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var serviceRequests = [
  {
    id: "1",
    subject: "Complaints/Noise",
    description: "My neighbor makes a lot of noise at night and I can't sleep",
  },
  {
    id: "2",
    subject: "Plumbing/ Bath Tub Drains",
    description: "My bathtub is not draining properly",
  },
  {
    id: "3",
    subject: "Doors & Locks",
    description: "I lost my key and I can't get into my apartment",
  },
];

app.get("/service-requests", function (req, res) {
  res.status(200).send(serviceRequests);
});

app.post("/service-requests", function (req, res) {
  const newService = req.body;
  if (
    !newService ||
    newService.subject === "" ||
    newService.description === ""
  ) {
    res.status(500).send({
      error: "Your service request must have a subject and description",
    });
  } else {
    serviceRequests.push(newService);
    res.status(200).send(serviceRequests);
  }
});

app.listen(3008, function () {
  console.log("API running on port 3008");
});

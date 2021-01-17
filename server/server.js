const express = require("express");
const mongoose = require('mongoose')
const cors = require("cors");
const app = express();

const bodyParser = require("body-parser");

app.use(cors({ exposedHeaders: ['x-auth-token'] }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


mongoose.connect('mongodb://localhost/homy', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDb...', err))


require('./routes/requests.route')(app);
require('./routes/auth.route')(app);
require('./routes/users.route')(app);



app.put("/service-requests/:id", function (req, res) {
  const serviceRequestId = req.params.id;

  const editService = req.body;

  const index = serviceRequests.findIndex((x) => x.id === serviceRequestId);

  if (index > -1) {
    serviceRequests[index].subject = editService.subject;
    serviceRequests[index].description = editService.description;
    res.status(200).send(serviceRequests);
  } else {
    res.status(404).send({
      error: "Your service request is not in our database",
    });
  }
});



app.listen(3008, function () {
  console.log("API running on port 3008");
});

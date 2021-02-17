const { Request, validate } = require("../models/request.model");
const { User } = require("../models/user.model");
const { Comment, validateComment } = require("../models/comments.schema");
const { Notification } = require("../models/notification.model");
const { Resident } = require('../models/resident.model')

const Counter = require("../models/counter.model");
const {
  createNotificationObject,
  sendEmailNotification,
  sendSMSNotification,
} = require("../helpers/notification");
const saveLog = require('../helpers/saveLog')
const { DONE, ARCHIVED } = require("../constants/status");
const jwt = require("jsonwebtoken");
const config = require("../config");


const _ = require("lodash");

const fs = require("fs");

exports.getRequest = async (req, res) => {



  Request
    .find({ user_id: req.user._id, status: { $ne: ARCHIVED } })
    .then((data) => res.send(data));
};
exports.getRequestById = (req, res) => {
  Request.findById(req.params.id)
    .then(data => res.send(data))
    .catch(err => { error: "Wrong request id" })
}

exports.getAllServiceRequests = (req, res) => {//send back all request not archived
  Request.find({ status: { $ne: ARCHIVED } }).then((data) => res.send(data));
};

exports.createRequest = async (req, res) => {
  const file = req.file;
  const path = file ? file.path : undefined;
  const result = validate(req.body);

  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }

  let counter = await Counter.findOneAndUpdate(
    { name: "request_number" },
    { $inc: { count: 1 } }
  ).exec();

  if (!counter) {
    //create first counter if none
    counter = new Counter({
      name: "request_number",
      count: 0,
    });
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
    resident_name: req.body.resident_name,
    user_id: req.user._id,
    notification: req.body.notification,
  });

  request.save().then((data) => res.send(data));
};

exports.deleteRequest = async (req, res) => {
  // console.log(req.params.id);
  const serviceRequestId = req.params.id;
  let request = await Request.findById(serviceRequestId);

  if (!request) return res.status(404).send("The request was not found");

  // if (request.user_id !== req.user._id)
  //   return res.status(401).send("Unauthorized");

  //erase image on the server if one
  if (request.image) {
    fs.unlink(`./${request.image}`, (err) => {
      if (err) console.log(err);
    });
  }
  request = await Request.deleteOne({ _id: serviceRequestId });
  if (!request) return res.status(404).send("The request was not found");

  res.send(request);
};

exports.commentOnRequest = async (req, res) => {
  const serviceRequestId = req.params.requestId;
  const request = await Request.findById(serviceRequestId);

  if (!request) return res.status(404).send("The request was not found");

  // if (request.user_id !== req.user._id)
  //   return res.status(401).send("Unauthorized");

  const result = validateComment(req.body);

  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }

  if (!request.comments) {
    request.comments = [];
  }

  request.comments.push({
    name: req.body.name,
    comment: req.body.comment,
    isManager: false,
  });

  await request.save();

  return res.status(200).send(request);
};

exports.commentOnRequestAsManager = async (req, res) => {
  const serviceRequestId = req.params.requestId;
  const request = await Request.findById(serviceRequestId);

  if (!request) return res.status(404).send("The request was not found");

  // if (request.user_id !== req.user._id)
  //   return res.status(401).send("Unauthorized");

  const result = validateComment(req.body);

  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }

  if (!request.comments) {
    request.comments = [];
  }

  request.comments.push({
    name: req.body.name,
    comment: req.body.comment,
    isManager: true,
  });

  await request.save();

  return res.status(200).send(request);
};

exports.updateStatusOnRequestAsManager = async (req, res) => {

  const serviceRequestId = req.params.requestId;
  console.log(req.body);
  const request = await Request.findById(serviceRequestId); // request = request document from database to check if it is updated


  if (request.status === req.body.status) {
    return res.send({ message: "Status has already been updated." });
  }

  const user = await User.findById(request.user_id);

  const notification = new Notification({
    type: request.type,
    description: request.description,
    status: req.body.status,
    notification_type: request.notification,
  });
  // console.log('request:', request);
  // console.log('notification:', notification);
  // console.log('user:', user)
  // // console.log('server.email',config.SERVER.EMAIL)
  // console.log(!config.TOGGLES.DISABLE_NOTIFICATION)
  // console.log('request.notification', request.notification)
  await notification.save();

  console.log(!config.TOGGLES.DISABLE_NOTIFICATION)
  console.log(request.notification)
  if (!config.TOGGLES.DISABLE_NOTIFICATION) {
    if (request.notification === "email") {
      // console.log('in email')
      const residentEmail = config.SERVER.EMAIL || user.email;
      // console.log(residentEmail)
      const emailSubject = "Status of request changed";
      const emailTextBody = emailSubject;
      const emailHtmlBody = emailSubject;
      const token = notification.generateNotificationToken();

      const residentNotificationEmailDetails = createNotificationObject(
        residentEmail,
        emailSubject,
        emailTextBody,
        emailHtmlBody,
        token
      );

      const responseNotification = await sendEmailNotification(
        residentNotificationEmailDetails
      );

      console.log(responseNotification)
      // if (config.ENV.NODE_ENV === 'dev') {
      //   saveLog(responseNotification, 'email')
      // }

    }
    if (request.notification === "phone") {
      const messageSubject = "Status of request changed";
      const resident = await Resident.findOne({ user_id: request.user_id })
      const residentPhone = config.SERVER.PHONE || resident.phone;
      console.log(residentPhone)
      if (residentPhone) {
        const token = notification.generateNotificationToken();
        const responseSMS = await sendSMSNotification(
          residentPhone,
          messageSubject,
          token
        );
        // console.log(responseSMS)
      }

    }
  }
  // return res.status(200).send(request);

  request.status = req.body.status;
  await request.save();
  return res.status(200).send(request);
};

exports.updateStatusOnRequest = async (req, res) => {

  const serviceRequestId = req.params.requestId;
  // console.log(req.body);
  const request = await Request.findById(serviceRequestId); // request = request document from database to check if it is updated

  if (request.status === req.body.status) {
    return res.send({ message: "Status has already been updated." });
  }

  // const user = await User.findById(request.user_id);

  // await Resident.findOneAndUpdate(
  //   { user_id: request.user_id },
  //   { $set: { notification_active: false, notification_req_id: "" } }
  // )


  request.status = req.body.status;
  await request.save();
  return res.status(200).send(request);
};


exports.getNotificationsDone = async (req, res) => {


  const requests = await Request.find({
    user_id: req.user._id,
    status: DONE
  })
    .select('_id')

  let requestIds = [];
  for (let i = 0; i < requests.length; i++) {
    requestIds.push(requests[i]._id);
  }

  return res.status(200).send(requestIds);
}

exports.authNotification = async (req, res) => {
  const decoded = jwt.verify(req.params.token, config.JWT.EMAIL_SECRET_KEY);

  const notification = await Notification.findById(decoded._id);

  // console.log(notification);
  return res.send(notification);
};

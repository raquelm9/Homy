const { Announcement } = require("../models/announcement.model");

exports.getAllAnnouncements = (req, res) => {
  Announcement.find().then((data) => res.send(data));
};

exports.createAnnouncement = async (req, res) => {
  const file = req.file;
  const path = file ? file.path : undefined;

  console.log(req.body);
  const announcement = new Announcement({
    date: req.body.date,
    username: req.body.username,
    image: path,
    title: req.body.title,
    announcement: req.body.announcement,
    // isManager: req.body.isManager,
  });

  announcement.save().then((data) => res.send(data));
};

exports.deleteAnnouncement = async (req, res) => {
  const AnnouncementId = req.params.id;
  let announcement = await Announcement.findById(AnnouncementId);
  if (!announcement) return res.status(404).send("The announcement was not found");

  announcement = await Announcement.deleteOne({ _id: AnnouncementId });
  if (!announcement) return res.status(404).send("The announcement was not found");
  res.send(announcement);
};
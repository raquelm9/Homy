const mongoose = require("mongoose");
// const Joi = require("joi");

const { PostComment } = require("./postComment.model");


const schema = mongoose.Schema({
  date: {
    type: String,
    required: false,
  },
//   user_id: String,
  username: String, 
  avatarUrl: String,
  imageUrl: String,
  caption: String,
  comments: [{ type: PostComment }],
  isManager: Boolean
  
});

exports.Post = mongoose.model("post", schema);

// function validateRequest(request) {
//   const schema = Joi.object({
//     date: Joi.string().required(),
//     type: Joi.string().required(),
//     subject: Joi.string().required(),
//     description: Joi.string().required(),
//     status: Joi.boolean(),
//     image: Joi.binary(),
//     request_number: Joi.number(),
//     unit_num: Joi.string(),
//     resident_name: Joi.string(),
//     user_id: Joi.string(),
//     notification: Joi.string()
//   });

//   return schema.validate(request);
// }




// exports.validate = validateRequest;

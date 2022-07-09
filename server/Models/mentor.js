const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mentorSchema = new Schema({
  email: {
    type: String,
    require: true,
  },
  phone: {
    type: Number,
    required: false,
  },
  password: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  language: {
    type: String,
    required: true,
  },
  language_id: {
    type: Number,
    require: true,
  },
  city: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  skills: {
    type: Array,
  },
  mentorship: {
    type: Array,
  },
  imageUrl: {
    type: String,
  },
  userType: {
    type: String,
    require: true,
  },
});
module.exports = mongoose.model("mentors", mentorSchema, "mentors");

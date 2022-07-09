const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mentorDetailsSchema = new Schema({
  mentor: {
    type: Object,
    default: {
      _id: "",
      email: "",
      password: "",
      name: "",
      language: "",
      language_id: 0,
      city: "",
      designation: "",
      company: "",
      skills: [],
      mentorship: [],
      imageUrl: "",
      userType: "mentor",
      __v: 0,
    },
  },
  callCount: {
    type: String,
    default: "0",
    require: true,
  },
  rating: {
    type: Number,
    require: true,
    default: 0,
  },
  reviewCount: {
    type: Number,
    default: 0,
  },
  totalIntake: {
    type: Number,
    require: true,
    default: 0,
  },
  totalRegistered: {
    type: Number,
    require: true,
    default: 0,
  },
  spotsLeft: {
    type: Number,
    require: true,
    default: 0,
  },
  cost: {
    type: Number,
    requred: true,
  },
  course_id: {
    type: String,
    required: false,
  },
  about: {
    type: String,
    required: true,
  },

  lcost: {
    type: String,
    requred: true,
  },
  hcost: {
    type: String,
    requred: true,
  },
  services_id: {
    type: Array,
    required: true,
  },
  services: {
    type: Array,
    required: true,
  },
  curriculum: {
    type: Array,
    required: true,
  },
  mentees: {
    type: Array,
  },
  status: {
    type: String,
  },
});
module.exports = mongoose.model(
  "mentorship",
  mentorDetailsSchema,
  "mentor_details"
);

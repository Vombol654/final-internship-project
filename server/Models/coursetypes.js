const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const coursetypesSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  content: {
    type: String,
  },
  image: {
    type: String,
  },
  skillsRequired: {
    type: Array,
  },
  course_type: {
    type: Number,
    require: true,
  },
  mentors: {
    type: Array,
  },
});
module.exports = mongoose.model(
  "coursetypes",
  coursetypesSchema,
  "coursetypes"
);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mentorServicesSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
});
module.exports = mongoose.model(
  "mentorservices",
  mentorServicesSchema,
  "mentor_services"
);

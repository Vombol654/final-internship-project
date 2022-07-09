const MentorDetails = require("../../Models/mentorshipdetail");

exports.getmentordetailsforAdmin = (req, res) => {
  MentorDetails.find()
    .then((response) => {
      res.status(200).json({
        message: "mentor details fetched successfully",
        mentor: response,
      });
    })
    .catch((err) => console.log(err));
};

exports.deleteMentorByIdforAdmin = (req, res) => {
  MentorDetails.findByIdAndDelete(req.body.id)
    .then((response) => {
      res.status(204).json({
        message: "Successfully Deleted that mentor",
      });
    })
    .catch((err) => console.log(err));
};

exports.updateMentorByIdforAdmin = (req, res) => {
  MentorDetails.findByIdAndUpdate(req.body._id, req.body, {
    new: true,
  })
    .then((response) => {
      res.status(200).json({
        message: "mentor details updated successfully",
        mentor: response,
      });
    })
    .catch((err) => console.log(err));
};

exports.createMentorforAdmin = (req, res) => {
  MentorDetails.create(req.body)
    .then((response) => {
      res.status(200).json({
        message: "mentor data created successfully",
        mentor: response,
      });
    })
    .catch((err) => console.log(err));
};

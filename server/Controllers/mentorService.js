const MentorServices = require("../Models/mentorServices");

exports.getMentorServices = async (req, res) => {
  const services = await MentorServices.find();
  res.json({ services });
};

exports.postMentorServices = async (req, res) => {
  const { name } = req.body;
  const services = new MentorServices({ name });
  services
    .save()
    .then((response) => {
      res
        .status(200)
        .json({
          message: "Service added to db successfully",
          services: response,
        });
    })
    .catch((err) => res.status(500).json({ message: "Service failed to add" }));
};

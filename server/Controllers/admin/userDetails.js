const UserDetails = require("../../Models/users");

exports.getAllUserDetails = (req, res) => {
  UserDetails.find()
    .then((response) => {
      res.status(200).json({
        message: "user fetched successfully",
        user: response,
      });
    })
    .catch((err) => console.log(err));
};

exports.deleteUserById = (req, res) => {
  UserDetails.findByIdAndDelete(req.body._id).then((response) => {
    res.status(204).json({
      message: "Deleted Successully",
    });
  });
};

exports.updateusers = (req, res) => {
  UserDetails.findByIdAndUpdate(req.body._id, req.body, {
    new: true,
  })
    .then((response) => {
      res.status(200).json({
        message: "user details updated successfully",
        user: response,
      });
    })
    .catch((err) => console.log(err));
};

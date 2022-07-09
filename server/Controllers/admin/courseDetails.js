const CourseDetails = require("../../Models/coursetypes");

exports.getAllCoursesForAdmin = (req, res) => {
  CourseDetails.find()
    .then((response) => {
      res.status(200).json({
        message: "Course Details Fetched Successfully",
        courses: response,
      });
    })
    .catch((err) => console.log(err));
};

exports.updateCourseforAdmin = (req, res) => {
  CourseDetails.findByIdAndUpdate(req.body._id, req.body, {
    new: true,
  })
    .then((response) => {
      res.status(200).json({
        message: "course details updated successfully",
        course: response,
      });
    })
    .catch((err) => console.log(err));
};

exports.deleteCourseforAdmin = (req, res) => {
  CourseDetails.findByIdAndDelete(req.body._id).then((response) => {
    res.status(204).json({
      message: "Course deleted Successfully",
    });
  });
};

exports.createCourseforAdmin = (req, res) => {
  CourseDetails.create(req.body)
    .then((response) => {
      res.status(200).json({
        message: "course created successfully",
        course: response,
      });
    })
    .catch((err) => console.log(err));
};

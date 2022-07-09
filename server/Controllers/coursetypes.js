const CourseTypes = require("../Models/coursetypes");
exports.getcoursetypes = (req, res) => {
  CourseTypes.find()
    .then((response) => {
      res.status(200).json({
        message: "coursetypes fetched successfully",
        coursetypes: response,
      });
    })
    .catch((err) => console.log(err));
};

exports.updateCourse = async (req, res) => {
  const { _id, name, content, image, skillsRequired, course_type, mentors } =
    req.body;

  const course = await CourseTypes.updateOne(
    { _id },
    {
      $set: {
        name,
        content,
        image,
        skillsRequired,
        course_type,
        mentors,
      },
    }
  );
  res.json({ course, message: "Updated successfully" });
};

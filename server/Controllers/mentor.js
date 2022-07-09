const Mentor = require("../Models/mentor");
const bcrypt = require("bcryptjs");
const { updateMentorshipByMentorId } = require("./mentorshipdetails");
const checkMentor = require("./common").checkAlreadySignedUp;

exports.getAllMentors = async (req, res) => {
  const mentors = await Mentor.find();
  res.json(mentors);
};

exports.signupmentor = async (req, res) => {
  console.log("SignUp new user initiated for mentor...");
  console.log(req.body);
  const {
    email,
    password,
    name,
    language,
    language_id,
    imageUrl,
    city,
    designation,
    company,
    skills,
    userType,
  } = req.body;
  const checkUser = await checkMentor(email);

  if (checkUser === null) {
    const mentor = new Mentor({
      email,
      password,
      name,
      language,
      language_id,
      imageUrl,
      city,
      designation,
      company,
      skills,
      userType,
    });
    mentor
      .save()
      .then((response) => {
        res.status(200).json({
          message: "user registered  successfully",
          user: response,
        });
      })
      .catch((err) => console.log(err));
  } else {
    console.log("User Alredy exist with same email id");
    res.json({
      message: "User Alredy exist with same email id",
      user: checkUser,
    });
  }
};

exports.updateMentor = async (req, res) => {
  const { email, imageUrl } = req.body;
  let message = "",
    user = {};
  const mentor = await Mentor.updateOne(
    { email },
    { $set: { ...req.body, password: bcrypt.hashSync(req.body.password) } }
  );

  console.log(email, mentor);
  if (mentor.modifiedCount > 0) {
    user = await Mentor.findOne({ email });
    updateMentorshipByMentorId(email, imageUrl);
    message = "Updated Successfully...";
    res.json({ message, user });
  } else {
    message = "No data updated";
    res.json({ message, user });
  }
};

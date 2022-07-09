const User = require("../Models/users");
const bcrypt = require("bcryptjs");
const checkAlreadySignedUp = require("./common").checkAlreadySignedUp;

exports.getAllUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

exports.signupuser = async (req, res) => {
  console.log("SignUp new user initiated...");
  const { email, password, firstname, lastname, imageUrl, userType } = req.body;
  const checkUser = await checkAlreadySignedUp(email);
  console.log(checkUser);

  if (checkUser === null) {
    const hashedPassword = bcrypt.hashSync(password);
    const user = new User({
      email,
      password: hashedPassword,
      firstname,
      lastname,
      imageUrl,
      userType,
    });
    user
      .save()
      .then((response) => {
        console.log(response);
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

exports.loginusers = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  let user = await User.findOne({ email });
  if (user === null) {
    user = await Mentor.findOne({ email });
  }
  // if(user===null){

  // }
  // else{
  user
    .then((response) => {
      console.log(response);
      if (response.length > 0) {
        const validPassword = bcrypt.compareSync(
          password,
          response["password"]
        );
        console.log(validPassword);
        if (validPassword) {
          console.log(response);
          res.status(200).json({
            message: "user data validated successfully",
            isAuthenticated: true,
            user: response,
          });
        }
      } else {
        console.log(response);
        res.status(200).json({
          message: "user is not validated",
          isAuthenticated: false,
          user: response,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
  // }
};

exports.getUser = async (req, res) => {
  const { _id } = req.params;
  const response = await User.find({ _id });
  res.json(response);
};

exports.deleteUser = async (req, res) => {
  const { email } = req.params;
  const response = await User.findOneAndDelete({ email });
  res.json(response);
};

exports.deleteUserById = async (req, res) => {
  const { _id } = req.params;
  const response = await User.findOneAndDelete({ _id });
  res.json(response);
};

exports.updateMentee = async (req, res) => {
  const { email } = req.body;
  let message = "",
    user = {};
  const mentee = await User.updateOne(
    { email },
    { $set: { ...req.body, password: bcrypt.hashSync(req.body.password) } }
  );

  console.log(email, mentee);
  if (mentee.modifiedCount > 0) {
    user = await User.findOne({ email });
    message = "Updated Successfully...";
    res.json({ message, user });
  } else {
    message = "No data updated";
    res.json({ message, user });
  }
};

const User = require("../Models/users");
const Mentor = require("../Models/mentor");
const bcrypt = require("bcryptjs");

exports.checkAlreadySignedUp = async (email) => {
  let user = await User.findOne({ email });
  console.log("I'm from CheckAlreadySignedUp checking mentee \t" + user);
  if (user === null) {
    user = await Mentor.findOne({ email });
    console.log("I'm from CheckAlreadySignedUp checking mentor \t" + user);
    if (user === null) {
      console.log("I'm from CheckAlreadySignedUp checking Admin \t" + user);
      return user;
    }
    return user;
  }

  return user;
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  let user = await User.findOne({ email });
  let data = {};
  if (user === null) {
    user = await Mentor.findOne({ email });
  }

  if (user === null) {
    data["message"] = "user is not validated"; //"";
    data["isAuthenticated"] = false;
    data["user"] = user;
  } else {
    const validPassword = bcrypt.compareSync(password, user["password"]);
    console.log(validPassword);
    if (validPassword) {
      console.log(user);
      data["message"] = "user data validated successfully";
      data["isAuthenticated"] = true;
      data["user"] = user;
    } else if (password === user["password"]) {
      data["message"] = "user data validated successfully";
      data["isAuthenticated"] = true;
      data["user"] = user;
    } else {
      data["message"] = "Check your password";
      data["isAuthenticated"] = false;
      data["user"] = user;
    }
  }
  res.json({ ...data });
};

// user
//   .then((response) => {
//     console.log(response);
//     if (response.length > 0) {
//       const validPassword = bcrypt.compareSync(
//         password,
//         response["password"]
//       );
//       console.log(validPassword);
//       if (validPassword) {
//         console.log(response);
//         data["message"] = "user data validated successfully"; //"";
//         data["isAuthenticated"] = true;
//         data["user"] = response;
//         res.status(200).json({ ...data });
//       }
//     } else {
//       console.log(response);
//       data["message"] = "user is not validated"; //"";
//       data["isAuthenticated"] = false;
//       data["user"] = response;
//       res.status(200).json({ ...data });
//     }
//   })
//   .catch((err) => {
//     console.log(err);
//     res.status(500).json({
//       error: err,
//     });
//   });

// if (user === null) {
//   data["message"] = "user is not validated"; //"";
//   data["isAuthenticated"] = false;
//   data["user"] = user;
// } else {
//   data["message"] = "user data validated successfully"; //"";
//   data["isAuthenticated"] = true;
//   data["user"] = user;
// }
// console.log(data);

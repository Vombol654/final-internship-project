import { isValidElement } from "react";

export const validate = async ({ field, value, setState }, match = "") => {
  let err = "",
    valid = false;
  switch (field) {
    case "firstName":
      if (value === "") {
        err = "Please fill your First Name";
        valid = false;
      } else {
        err = "";
        valid = true;
      }
      setState({ value, err, valid });
      return;

    case "lastName":
      if (value === "") {
        err = "Please fill your Last Name";
        valid = false;
      } else {
        err = "";
        valid = true;
      }
      setState({ value, err, valid });
      return;

    case "name":
      if (value === "") {
        err = "Please fill your Name";
        valid = false;
      } else {
        err = "";
        valid = true;
      }
      setState({ value, err, valid });
      return;

    case "city":
      if (value === "") {
        err = "Please fill your City";
        valid = false;
      } else {
        err = "";
        valid = true;
      }
      setState({ value, err, valid });
      return;

    case "language":
      if (value === "") {
        err = "Please fill your Language";
        valid = false;
      } else {
        err = "";
        valid = true;
      }
      setState({ value, err, valid });
      return;

    case "company":
      if (value === "") {
        err = "Please fill your company name";
        valid = false;
      } else {
        err = "";
        valid = true;
      }
      setState({ value, err, valid });
      return;

    case "designation":
      if (value === "") {
        err = "Please fill your designation";
        valid = false;
      } else {
        err = "";
        valid = true;
      }
      setState({ value, err, valid });
      return;

    case "image":
      if (value === "") {
        err = "Please upload your Profile Image";
        valid = false;
      } else {
        err = "";
        valid = true;
      }
      setState({ value, err, valid });
      return;

    case "email":
      const length = value.length;
      if (value === "") {
        err = "Please fill your Email ID";
        valid = false;
      } else if (value.match(/[A-Z]/g)) {
        err = "Email ID can't contains UpperCase letter";
        valid = false;
      } else if (value.substring(length - 10, length) !== "@gmail.com") {
        err = "Invalid Email ID";
        valid = false;
      } else {
        err = "";
        valid = true;
      }
      setState({ value, err, valid });
      return;

    case "phone":
      if (value === "") {
        err = "Please fill your Phone Number";
        valid = false;
      } else if (value.match(/[^0-9]/g)) {
        err = "Phone number can contain only numbers";
        valid = false;
      } else if (value.length < 10 || value.length > 10) {
        err = "Phone Number should be in 10 digits";
        valid = false;
      } else {
        err = "";
        valid = true;
      }
      setState({ value, err, valid });
      return;

    case "dob":
      const d = new Date();
      const yob = parseInt(value.substring(0, 4));
      const current = [d.getDate(), d.getMonth(), d.getFullYear()];
      if (value === "dob") {
        err = "Please fill your date of birth";
        valid = false;
      } else if (current[2] - yob < 13) {
        err = "Your age is restrict to use the application";
        valid = false;
      } else {
        err = "";
        valid = true;
      }
      setState({ value, err, valid });
      return;

    case "skills":
      if (value.length < 1) {
        err = "You need to add atleast one Skill";
        valid = false;
      } else {
        err = "";
        valid = true;
      }
      setState({ value, err, valid });
      return valid;

    case "password":
      const invalid = password(value);
      if (value === "") {
        err = "Please fill your Password";
        valid = false;
      } else if (value.length < 8) {
        err = "Password must be more than 7 characters";
        valid = false;
      } else if (invalid.length > 0) {
        err = "Your password missing : ";
        invalid.map((s, i) => (err += i + 1 + ") " + s + "  "));
        valid = false;
      } else {
        err = "";
        valid = true;
      }
      setState({ value, err, valid });
      return;

    case "cpassword":
      const cinvalid = password(value);
      if (value === "") {
        err = "Please Confirm your Password";
        valid = false;
      } else if (value !== match) {
        err = "Password Mismatch...";
        valid = false;
      } else if (value.length < 8) {
        err = "Password must be more than 7 characters";
        valid = false;
      } else if (cinvalid.length > 0) {
        err = "Your password missing : ";
        cinvalid.map((s, i) => (err += i + 1 + ") " + s + "  "));
        valid = false;
      } else {
        err = "";
        valid = true;
      }
      setState({ value, err, valid });
      return;

    case "totalIntake":
      if (value === "") {
        err = "Please fill the total intake of your service";
        valid = false;
      } else if (value.match(/[^0-9]/g)) {
        err = "Number only allowed for total intake";
        valid = false;
      } else {
        err = "";
        valid = true;
      }
      setState({ value, err, valid });
      return;

    case "callcount":
      if (value === "") {
        err = "Please fill the Call count per month";
        valid = false;
      } else if (value.match(/[^0-9a-zA-Z]/g)) {
        err = "Space or Special Characters are not allowed";
        valid = false;
      } else {
        err = "";
        valid = true;
      }
      setState({ value, err, valid });
      return;

    case "curriculum":
      if (value.length < 1) {
        err = "You need to add atleast one concept";
        valid = false;
      } else {
        err = "";
        valid = true;
      }
      setState({ value, err, valid });
      return valid;

    case "services":
      if (value.length < 1) {
        err = "You need to add atleast one service";
        valid = false;
      } else {
        err = "";
        valid = true;
      }
      setState({ value, err, valid });
      return valid;

    case "about":
      if (value === "") {
        err = "Please fill about your mentorship";
        valid = false;
      } else {
        err = "";
        valid = true;
      }
      setState({ value, err, valid });
      return;

    case "cost":
      if (value === "") {
        err = "Please fill your expected fee";
        valid = false;
      } else if (value.match(/[^0-9]/g)) {
        err = "Fee should be in numbers";
        valid = false;
      } else {
        err = "";
        valid = true;
      }
      setState({ value, err, valid });
      return;
  }
};

const password = (value) => {
  let invalid = [];
  if (value.match(/[A-Z]/g) === null) {
    invalid.push("A UpperCase Character");
  }
  if (value.match(/[a-z]/g) === null) {
    invalid.push("A LowerCase Character");
  }
  if (value.match(/[0-9]/g) === null) {
    invalid.push("A Number");
  }
  if (value.match(/[^a-zA-Z0-9]/g) === null) {
    invalid.push("A Special Character");
  }

  return invalid;
};

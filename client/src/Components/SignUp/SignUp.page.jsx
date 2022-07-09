import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import { validate } from "../../validate";
import Toast from "react-bootstrap/Toast";
import Button from "../Button";
import Form from "../Form";
import InputField from "../InputField";

import { signup } from "../../store/action/signupAction";

import "./SignUp.style.css";
import SelectBox from "../SelectBox";
import MultiInput from "../MultiInput";

const defaultState = { value: "", err: "", valid: false };

const SignUp = ({ user, signupUser }) => {
  //Common
  const [fname, setFname] = useState(defaultState);
  const [email, setEmail] = useState(defaultState);
  const [password, setPassword] = useState(defaultState);
  const [cpassword, setCPassword] = useState(defaultState);
  const [imgUrl, setimgUrl] = useState("");

  //Mentee
  const [lname, setLname] = useState(defaultState);
  const [dob, setDob] = useState(defaultState);
  const [dobType, setDobType] = useState("text");

  //Mentor
  const [city, setCity] = useState(defaultState);
  const [language, setLanguage] = useState(defaultState);
  const [phone, setPhone] = useState(defaultState);
  const [image, setImage] = useState(defaultState);
  const [designation, setDesignation] = useState(defaultState);
  const [company, setCompany] = useState(defaultState);
  const [skills, setSkills] = useState({ ...defaultState, value: [] });
  const [language_id, setLanguage_Id] = useState(null);

  const [formMentee, setFormMentee] = useState(true);

  // HELPING STATES
  const [data, setData] = useState([]);
  const [node, setNode] = useState(null);
  const [lastModified, setLastModified] = useState(0);

  // SHOW TOAST
  const [showToast, setShowToast] = useState(false);
  const history = useHistory();

  const toggleToast = () => {
    setShowToast(!showToast);
    while (user.loading) {}

    delayToast();
  };

  const delayToast = () => {
    setTimeout(() => {
      setShowToast(false);
    }, 1000);
  };

  useEffect(() => {
    if (dobType === "text") {
      setDob({ ...dob, value: "" });
    } else {
      setDob({ ...dob, value: "dob" });
    }
  }, [dobType]);

  useEffect(() => {
    resetHandler();
    const fetchData = async () => {
      await fetch("http://localhost:8085/language")
        .then((res) => res.json())
        .then((data) => {
          setData([...data.language]);
        });
    };
    if (!formMentee) {
      fetchData();
    }
  }, [formMentee]);

  useEffect(() => {
    // console.log(user);
    if (!showToast && user.signed) history.push(`/Login`);
  }, [user, showToast]);

  const submitHandler = (e) => {
    e.preventDefault();
  };

  const checkSkillsValid = async () => {
    return await validate({
      field: "skills",
      value: skills.value,
      setState: setSkills,
    });
  };

  const uploadImage = async () => {
    const data = new FormData();
    data.append("file", image.value);
    await fetch("http://localhost:8085/file/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setimgUrl(data.imageUrl);
      })
      .catch((err) => {
        // alert("Something Went Wrong in uploading image");
        console.log(err);
      });
  };

  const signupHandler = async () => {
    if (formMentee) {
      if (
        fname.valid &&
        lname.valid &&
        image.valid &&
        email.valid &&
        cpassword.valid
      ) {
        signupUser({
          firstname: fname.value,
          lastname: lname.value,
          email: email.value,
          imageUrl: imgUrl,
          password: cpassword.value,
          userType: "mentee",
        });
        toggleToast();
      } else {
        alert("Signup Failure");
      }
    } else {
      let res = await checkSkillsValid();
      if (
        fname.valid &&
        city.valid &&
        language.valid &&
        image.valid &&
        email.valid &&
        phone.valid &&
        company.valid &&
        designation.valid &&
        res &&
        cpassword.valid
      ) {
        signupUser({
          name: fname.value,
          city: city.value,
          language: language.value,
          language_id,
          email: email.value,
          password: cpassword.value,
          designation: designation.value,
          company: company.value,
          skills: skills.value,
          imageUrl: imgUrl,
          userType: "mentor",
        });
        toggleToast();
      } else {
        console.log(fname);
        console.log(city);
        console.log(language);
        console.log(image);
        console.log(email);
        console.log(phone);
        console.log(company);
        console.log(designation);
        console.log(skills);
        console.log(cpassword);
        alert("Failed to signUp");
      }
    }
  };

  useEffect(() => {
    if (language.value !== "") {
      const langSelected = data.find((lang) => {
        return lang["name"] === language.value;
      });

      setLanguage_Id(langSelected["language_id"]);
    }
  }, [language]);

  useEffect(() => {
    const deleteImage = async () => {
      // console.log("Before Delete : " + imgUrl);
      await fetch(imgUrl, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then(({ message }) => {
          if (message === "Successfully deleted...") {
            setimgUrl("");
          } else {
            // console.log(message);
          }
        });
    };

    const upload = async () => {
      await uploadImage();
      // console.log(imgUrl);
    };

    // if (image.value !== "") {
    //   console.log(image.value.File);
    if (image.value !== "") {
      // console.log(image.value);
      // console.log("In" + imgUrl);
      setLastModified(image.value["lastModified"]);
      if (image.value["lastModified"] !== lastModified) {
        if (imgUrl !== "") {
          deleteImage();
          // console.log("After Delete : " + imgUrl);
        }
        upload();
      }
      // console.log("Uploaded Image on " + imgUrl);
    }
    // }
  }, [image]);

  useEffect(() => {
    if (imgUrl !== "") console.log("ImgUrl -> " + imgUrl);
  }, [imgUrl]);

  const resetHandler = () => {
    setFname(defaultState);
    setLname(defaultState);
    setDob(defaultState);
    setDobType("text");
    setEmail(defaultState);
    setPassword(defaultState);
    setCPassword(defaultState);
    setPhone(defaultState);
    setLanguage(defaultState);
    setLanguage_Id(null);
    setCity(defaultState);
    setSkills({ ...defaultState, value: [] });
    setDesignation(defaultState);
    setCompany(defaultState);
    setImage(defaultState);
    setimgUrl("");
  };

  return (
    <>
      <div className={`form-container ${formMentee ? "signup-form" : ""}`}>
        <div className="user-btn-container">
          <Button
            btnName="Mentee"
            name="mentee-btn"
            className={`${formMentee ? "active" : ""}`}
            onClick={() => setFormMentee(true)}
          />
          <Button
            btnName="Mentor"
            className={`${formMentee ? "" : "active"}`}
            onClick={() => setFormMentee(false)}
          />
        </div>
        {formMentee && (
          <Form className="grid-col-2" submitHandler={submitHandler}>
            <InputField
              label="First Name"
              id="firstName"
              value={fname.value}
              error={fname.err}
              onChange={(e) => setFname({ ...fname, value: e.target.value })}
              onBlur={() =>
                validate({
                  field: "firstName",
                  value: fname.value,
                  setState: setFname,
                })
              }
            />
            <InputField
              label="Last Name"
              id="lastName"
              value={lname.value}
              error={lname.err}
              onChange={(e) => setLname({ ...lname, value: e.target.value })}
              onBlur={() =>
                validate({
                  field: "lastName",
                  value: lname.value,
                  setState: setLname,
                })
              }
            />
            <InputField
              label="Profile Image"
              id="profile-img"
              type={image.value === "" ? "text" : "file"}
              name="image"
              error={image.err}
              onFocus={(e) => {
                setNode({
                  label: e.target.previousElementSibling,
                  input: e.target,
                });
                e.target.previousElementSibling.classList.remove("shrink");
                e.target.type = "file";
              }}
              onChange={(e) => {
                node.label.classList.remove("shrink");
                setImage({ ...image, value: e.target.files[0] });
              }}
              onBlur={() => {
                validate({
                  field: "image",
                  value: image.value,
                  setState: setImage,
                });
              }}
            />
            {/* <InputField
              label="Date of Birth"
              type={dobType}
              id="dob"
              value={dob.value}
              error={dob.err}
              onFocus={(e) => {
                setDobType("date");
              }}
              onChange={(e) => {
                console.log(e.target.value);
                setDob({ ...dob, value: e.target.value });
              }}
              onBlur={(e) => {
                if (dob.value === "" || dob.value === "dob") setDobType("text");
                validate({ field: "dob", value: dob.value, setState: setDob });
              }}
            /> */}
            <InputField
              label="Email"
              id="email"
              value={email.value}
              error={email.err}
              onChange={(e) => setEmail({ ...email, value: e.target.value })}
              onBlur={() =>
                validate({
                  field: "email",
                  value: email.value,
                  setState: setEmail,
                })
              }
            />
            <InputField
              label="Password"
              id="password"
              name="password"
              type="password"
              value={password.value}
              onChange={(e) =>
                setPassword({ ...password, value: e.target.value })
              }
              onBlur={() =>
                validate({
                  field: "password",
                  value: password.value,
                  setState: setPassword,
                })
              }
              error={password.err}
            />
            <InputField
              label="Confirm Password"
              id="cpassword"
              name="password"
              type="password"
              value={cpassword.value}
              onChange={(e) =>
                setCPassword({ ...cpassword, value: e.target.value })
              }
              onBlur={() =>
                validate(
                  {
                    field: "cpassword",
                    value: cpassword.value,
                    setState: setCPassword,
                  },
                  password.value
                )
              }
              error={cpassword.err}
            />
            <Button
              className="btn btn-signup"
              btnName="Reset"
              onClick={resetHandler}
            />
            <Button
              className="btn btn-signup"
              btnName="SignUp"
              onClick={signupHandler}
            />
          </Form>
        )}

        {!formMentee && (
          <>
            <Form className={`grid-col-2 show`} submitHandler={submitHandler}>
              <InputField
                label="Name"
                id="name"
                value={fname.value}
                error={fname.err}
                onChange={(e) => setFname({ ...fname, value: e.target.value })}
                onBlur={() =>
                  validate({
                    field: "name",
                    value: fname.value,
                    setState: setFname,
                  })
                }
              />

              <SelectBox
                data={data}
                id="city"
                label="City"
                value={city.value}
                error={city.err}
                onFocus={(e) => {
                  setNode({
                    label: e.target.previousElementSibling,
                    selectBox: e.target,
                  });
                  e.target.classList.remove("select-color-none");
                  e.target.previousElementSibling.classList.remove("shrink");
                }}
                onChange={(e) => setCity({ ...city, value: e.target.value })}
                onBlur={(e) => {
                  if (city.value === "") {
                    node.selectBox.classList.add("select-color-none");
                    node.label.classList.add("shrink");
                  }
                  validate({
                    field: "city",
                    value: city.value,
                    setState: setCity,
                  });
                }}
                type="city"
              />
              <SelectBox
                id="language"
                data={data}
                label="Language"
                value={language.value}
                error={language.err}
                onFocus={(e) => {
                  setNode({
                    label: e.target.previousElementSibling,
                    selectBox: e.target,
                  });
                  e.target.classList.remove("select-color-none");
                  e.target.previousElementSibling.classList.remove("shrink");
                }}
                onChange={(e) =>
                  setLanguage({ ...language, value: e.target.value })
                }
                onBlur={(e) => {
                  if (language.value === "") {
                    node.selectBox.classList.add("select-color-none");
                    node.label.classList.add("shrink");
                  }
                  validate({
                    field: "language",
                    value: language.value,
                    setState: setLanguage,
                  });
                }}
                type="name"
              />

              <InputField
                label="Profile Image"
                id="profile-img"
                type={image.value === "" ? "text" : "file"}
                name="image"
                error={image.err}
                onFocus={(e) => {
                  setNode({
                    label: e.target.previousElementSibling,
                    input: e.target,
                  });
                  e.target.previousElementSibling.classList.remove("shrink");
                  e.target.type = "file";
                }}
                onChange={(e) => {
                  node.label.classList.remove("shrink");
                  // node.input.type = "file";
                  setImage({ ...image, value: e.target.files[0] });
                }}
                onBlur={() => {
                  // if (image.value["File"] === undefined) {
                  //   node.label.classList.add("shrink");
                  //   node.input.type = "type";
                  // }
                  validate({
                    field: "image",
                    value: image.value,
                    setState: setImage,
                  });
                }}
              />

              <InputField
                label="Email"
                id="email"
                value={email.value}
                error={email.err}
                onChange={(e) => setEmail({ ...email, value: e.target.value })}
                onBlur={() =>
                  validate({
                    field: "email",
                    value: email.value,
                    setState: setEmail,
                  })
                }
              />

              <InputField
                label="Phone No"
                id="phone"
                value={phone.value}
                error={phone.err}
                onChange={(e) => setPhone({ ...phone, value: e.target.value })}
                onBlur={() =>
                  validate({
                    field: "phone",
                    value: phone.value,
                    setState: setPhone,
                  })
                }
              />
              <Button
                className="btn btn-signup"
                btnName="Reset"
                onClick={resetHandler}
              />
              <Button
                btnName="Next"
                className="btn btn-signup"
                onClick={(e) => {
                  e.currentTarget.parentElement.classList.add("hide");
                  e.currentTarget.parentElement.nextElementSibling.classList.remove(
                    "hide"
                  );
                }}
              />
            </Form>
            <Form className="grid-col-2 hide" submitHandler={submitHandler}>
              <InputField
                label="Company"
                id="company"
                value={company.value}
                error={company.err}
                onChange={(e) =>
                  setCompany({ ...phone, value: e.target.value })
                }
                onBlur={() =>
                  validate({
                    field: "company",
                    value: company.value,
                    setState: setCompany,
                  })
                }
              />
              <InputField
                label="Designation"
                id="designation"
                value={designation.value}
                error={designation.err}
                onChange={(e) =>
                  setDesignation({ ...phone, value: e.target.value })
                }
                onBlur={() =>
                  validate({
                    field: "designation",
                    value: designation.value,
                    setState: setDesignation,
                  })
                }
              />
              <div className="grid-col-full">
                <MultiInput
                  label="Skills"
                  setState={setSkills}
                  state={skills}
                  style={{ width: "90%" }}
                />
              </div>
              <InputField
                label="Password"
                id="password"
                name="password"
                type="password"
                value={password.value}
                onChange={(e) =>
                  setPassword({ ...password, value: e.target.value })
                }
                onBlur={() =>
                  validate({
                    field: "password",
                    value: password.value,
                    setState: setPassword,
                  })
                }
                error={password.err}
              />
              <InputField
                label="Confirm Password"
                id="cpassword"
                name="password"
                type="password"
                value={cpassword.value}
                onChange={(e) =>
                  setCPassword({ ...cpassword, value: e.target.value })
                }
                onBlur={() =>
                  validate(
                    {
                      field: "cpassword",
                      value: cpassword.value,
                      setState: setCPassword,
                    },
                    password.value
                  )
                }
                error={cpassword.err}
              />
              <Button
                btnName="Back"
                className="btn btn-signup"
                onClick={(e) => {
                  e.currentTarget.parentElement.classList.add("hide");
                  e.currentTarget.parentElement.previousElementSibling.classList.remove(
                    "hide"
                  );
                }}
              />
              <Button
                className="btn btn-signup"
                btnName="SignUp"
                onClick={signupHandler}
              />
            </Form>
          </>
        )}
        <p className="no-account">
          Already have an account <Link to="/Login">Login here!</Link>
        </p>
      </div>
      <Toast show={showToast} onClose={toggleToast} className="toast-bg mt-5">
        <Toast.Header closeButton={true}>
          {user.signed && (
            <strong className="me-auto">SignedUp Successfully...</strong>
          )}
          {user.loading && <strong className="me-auto">Loading</strong>}
          {user.error !== "" && (
            <strong className="me-auto">SignUp Failed</strong>
          )}
          {/* <small>11 mins ago</small> */}
        </Toast.Header>
        {user.loading && (
          <Toast.Body>
            <span className="spinner-border spinner-border-sm"></span>{" "}
            Loading...
          </Toast.Body>
        )}
        {user.loggedIn &&
          !user.loading &&
          user["user"]["userType"] === "mentee" && (
            <Toast.Body>
              Hello, {user.user.firstname} {user.user.lastname}.
            </Toast.Body>
          )}
        {user.loggedIn &&
          !user.loading &&
          user["user"]["userType"] === "mentor" && (
            <Toast.Body>Hello, {user.user.name}.</Toast.Body>
          )}
        {user.error && !user.loading && <Toast.Body>{user.error}</Toast.Body>}
      </Toast>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.SignUp,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signupUser: (signupData) => dispatch(signup(signupData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);

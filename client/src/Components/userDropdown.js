import { BackgroundImage } from "./userProfileImage";
import Form from "./Form";
import InputField from "./InputField";
import { validate } from "../validate";
import Modal from "react-modal";
import "../Styles/userDropdown.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import Button from "./Button";
import { connect } from "react-redux";
import { logout, update } from "../store/action/loginAction";

const customStyles = {
  content: {
    position: "relative",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    height: "70%",
  },
};

const defaultState = { value: "", err: "", valid: false };
const UserDropdown = ({ user, updateUser, Logout }) => {
  const history = useHistory();
  const {
    imageUrl = new URL("../Images/default-profile.png", import.meta.url),
  } = user;
  const [dropdown, setDropDown] = useState(false);
  const [profilemodalIsOpen, setprofilemodalIsOpen] = useState(false);
  const [formIsOpen, setformIsOpen] = useState(false);
  const [fileInput, setFileInput] = useState(false);
  const [email, setEmail] = useState({
    ...defaultState,
    value: user.email,
    valid: true,
  });
  const [password, setPassword] = useState(defaultState);
  const [fileUrl, setfileUrl] = useState("");
  const [unsaveUrl, setUnSaveUrl] = useState("");
  const [image, setImage] = useState({ ...defaultState, value: "" });
  const [lastModified, setLastModified] = useState(0);
  const [firstname, setfirstname] = useState(
    user.userType === "mentee"
      ? { ...defaultState, value: user.firstname, valid: true }
      : defaultState
  );
  const [lastname, setlastname] = useState(
    user.userType === "mentee"
      ? { ...defaultState, value: user.lastname, valid: true }
      : defaultState
  );
  const [username, setName] = useState(
    user.userType !== "mentee"
      ? { ...defaultState, value: user.name, valid: true }
      : defaultState
  );

  // HELPER STATE
  const [node, setNode] = useState(null);

  const updateUserData = async () => {
    if (user.userType === "mentee") {
      if (firstname.valid && lastname.valid && password.valid) {
        if (fileUrl !== imageUrl) {
          await deleteImage(imageUrl);
          setLastModified(0);
        }
        updateUser({
          email: user.email,
          firstname: firstname.value,
          lastname: lastname.value,
          imageUrl: fileUrl,
          userType: user.userType,
          password: password.value,
        });
        formIsOpenHandler();
      } else {
        alert("Please fill the leftout fields");
      }
    } else {
      if (username.valid && password.valid) {
        updateUser({
          email: user.email,
          name: username.value,
          imageUrl: fileUrl,
          userType: user.userType,
          password: password.value,
        });
        formIsOpenHandler();
      } else {
        alert("Please fill the leftout fields");
      }
    }
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
        setfileUrl(data.imageUrl);
      })
      .catch((err) => {
        // alert("Something Went Wrong in uploading image");
        console.log(err);
      });
  };

  useEffect(() => {
    setfileUrl(imageUrl);
    setUnSaveUrl(imageUrl);
  }, []);

  useEffect(() => {
    // setfileUrl(user.imageUrl);
  }, [user]);

  useEffect(() => {
    console.log(fileUrl);
  }, [fileUrl]);

  const deleteImage = async (imgUrl) => {
    console.log("Before Delete : " + imgUrl);
    await fetch(imgUrl, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(({ message }) => {
        if (message === "Successfully deleted...") {
          setfileUrl("");
        } else {
          console.log(message);
        }
      });
  };
  useEffect(() => {
    const upload = async () => {
      await uploadImage();
      // console.log(imgUrl);
    };

    console.log("File Url :" + fileUrl);
    console.log("Unsave Url :" + unsaveUrl);
    console.log(lastModified, image.value["lastModified"]);
    if (image.value !== "") {
      // setLastModified(image.value["lastModified"]);
      if (
        image.value !== fileUrl &&
        image.value["lastModified"] !== lastModified
      ) {
        if (
          fileUrl !== "" &&
          fileUrl !== unsaveUrl &&
          fileUrl !== imageUrl &&
          unsaveUrl !== imageUrl
        ) {
          console.log(fileUrl, unsaveUrl);
          deleteImage(fileUrl);
        }
        upload();
      }
    }
  }, [image]);

  const profilemodalCloseHandler = () => {
    setprofilemodalIsOpen(false);
  };
  const viewProfileHandler = () => {
    setprofilemodalIsOpen(true);
    setDropDown(false);
  };
  const formIsOpenHandler = async () => {
    // if (formIsOpen) {
    //   if (fileUrl !== imageUrl) {
    //     await deleteImage(fileUrl);
    //     setLastModified(0);
    //     setfileUrl(imageUrl);
    //   }
    // }
    setformIsOpen((prevState) => !prevState);
    setDropDown(false);
  };

  const logoutHandler = () => {
    Logout();
    history.push("/");
  };

  useEffect(() => {
    console.log(formIsOpen);
  }, [formIsOpen]);

  return (
    <div
      className={`user-dropdown ${dropdown ? "active" : ""}`}
      onMouseEnter={() => setDropDown(true)}
      onMouseLeave={() => setDropDown(false)}
    >
      <button className="dropdown-btn">
        <BackgroundImage imageUrl={imageUrl} />
        <span className="user-name">
          {user.userType === "mentee" ? user.firstname : user.name}
        </span>
      </button>
      <div className="dropdown-container">
        {/* <Link to="/Profile">View Profile</Link>*/}
        <a onClick={viewProfileHandler}>View Profile</a>
        <Link to="/Cart">Cart</Link>
        <a onClick={logoutHandler}>Logout</a>
      </div>
      <Modal isOpen={profilemodalIsOpen} style={customStyles}>
        <div>
          <i
            style={{ position: "absolute", top: "1rem", right: "1rem" }}
            className="fa-solid fa-xmark cross"
            onClick={profilemodalCloseHandler}
          ></i>
          {!formIsOpen && (
            <div
              className="card"
              style={{
                width: "50%",
                display: "flex",
                flexDirection: "column",
                margin: "10% auto",
              }}
            >
              <BackgroundImage
                imageUrl={imageUrl}
                style={{
                  width: "20rem",
                  height: "20rem",
                  alignSelf: "center",
                  marginTop: "1.2rem",
                  padding: "1.2rem 2.4rem",
                }}
              />

              {/* user data render */}
              <div className="card-body" style={{ fontSize: "1.6rem" }}>
                <p style={{ margin: ".5em 0" }}>
                  <b style={{ marginRight: "1.2rem" }}>Name:</b>
                  {user.userType === "mentee"
                    ? `${user.firstname} ${user.lastname}`
                    : user.name}
                </p>
                <p style={{ margin: ".5em 0" }} className="card-title">
                  <b style={{ marginRight: "1.2rem" }}>Email:</b> {user.email}
                </p>
                <p style={{ margin: ".5em 0" }}>
                  <b style={{ marginRight: "1.2rem" }}>userType:</b>
                  {user.userType}
                </p>
                <div
                  className="card-btn"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <a
                    className="btn btn-success"
                    style={{
                      padding: "0.8rem 1.6rem",
                      fontSize: "1.6rem",
                      margin: ".5em",
                    }}
                    onClick={formIsOpenHandler}
                  >
                    Do you Want to Update?
                  </a>
                </div>
              </div>
            </div>
          )}
          {/* form */}
          {formIsOpen && (
            <>
              <Form
                className="grid-col-1"
                style={{ width: "80%", margin: "5% auto" }}
                submitHandler={(e) => e.preventDefault()}
              >
                <div className="update-profile-img">
                  <BackgroundImage
                    imageUrl={fileUrl}
                    style={{
                      width: "12rem",
                      height: "12rem",
                      alignSelf: "center",
                      marginTop: "1.2rem",
                      padding: "1.2rem 2.4rem",
                    }}
                  />
                  {fileInput && (
                    <InputField
                      id="profile-img"
                      type={"file"}
                      name="image"
                      value={image.value}
                      error={image.err}
                      onChange={(e) => {
                        setImage({ ...image, value: e.target.files[0] });
                      }}
                    />
                  )}
                  {!fileInput && (
                    <Button
                      btnName="Change"
                      className="btn btn-success"
                      onClick={() => {
                        setUnSaveUrl(fileUrl);
                        setFileInput(true);
                      }}
                    />
                  )}
                  {fileInput && (
                    <div className="btn-container">
                      <Button
                        btnName="Cancel"
                        className="btn btn-danger"
                        onClick={async () => {
                          setFileInput(false);
                          if (fileUrl !== unsaveUrl && fileUrl !== imageUrl)
                            await deleteImage(fileUrl);
                          setfileUrl(unsaveUrl);
                        }}
                      />
                      <Button
                        btnName="upload"
                        className="btn btn-success"
                        disabled={image.value ? false : true}
                        onClick={async () => {
                          let url = fileUrl;
                          console.log(image.value, lastModified);
                          if (image.value !== undefined) {
                            if (
                              image.value["lastModified"] !== lastModified &&
                              fileUrl !== unsaveUrl
                            ) {
                              if (unsaveUrl !== imageUrl) {
                                await deleteImage(unsaveUrl);
                              }
                              setfileUrl(url);
                              setUnSaveUrl(url);
                              setFileInput(false);
                              setLastModified(image.value["lastModified"]);
                            }
                          }
                        }}
                      />
                    </div>
                  )}
                </div>
                {user.userType === "mentee" ? (
                  <>
                    <InputField
                      id="firstname"
                      label="First Name"
                      value={firstname.value}
                      onChange={(e) =>
                        setfirstname({ ...firstname, value: e.target.value })
                      }
                      onBlur={() =>
                        validate({
                          field: "firstname",
                          value: firstname.value,
                          setState: setfirstname,
                        })
                      }
                      error={firstname.err}
                    />
                    <InputField
                      id="lastname"
                      label="Last Name"
                      value={lastname.value}
                      onChange={(e) =>
                        setlastname({ ...lastname, value: e.target.value })
                      }
                      onBlur={() =>
                        validate({
                          field: "lastname",
                          value: lastname.value,
                          setState: setlastname,
                        })
                      }
                      error={lastname.err}
                    />
                  </>
                ) : (
                  <InputField
                    id="name"
                    label="Name"
                    value={username.value}
                    onChange={(e) =>
                      setName({ ...username, value: e.target.value })
                    }
                    onBlur={() =>
                      validate({
                        field: "name",
                        value: username.value,
                        setState: setName,
                      })
                    }
                    error={username.err}
                  />
                )}
                <InputField
                  id="email"
                  label="Email"
                  value={email.value}
                  disabled={true}
                  className="update-email"
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
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "80%",
                    margin: "0 auto",
                  }}
                >
                  <Button
                    btnName="Cancel"
                    className="btn-login"
                    onClick={formIsOpenHandler}
                  />
                  <Button
                    btnName="Update"
                    className="btn-login"
                    onClick={() => updateUserData()}
                  />
                </div>
              </Form>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.Login.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    Logout: () => dispatch(logout()),
    updateUser: (user) => dispatch(update(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDropdown);

{
  /*  */
}

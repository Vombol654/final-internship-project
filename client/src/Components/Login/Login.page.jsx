import { useState, useEffect } from "react";
import { connect } from "react-redux";
import Button from "../../Components/Button";
import Form from "../Form";
import InputField from "../InputField";

import "./Login.style.css";

import { login } from "../../store/action/loginAction";
import Toast from "react-bootstrap/Toast";
import { Link, useHistory } from "react-router-dom";

import { validate } from "../../validate";
import {
  setMentor,
  setMentorshipDetails,
} from "../../store/action/mentorAction";

const defaultState = { value: "", err: "", valid: false };

const Login = ({ user, signed, loginUser, setMentorship }) => {
  const [email, setEmail] = useState(defaultState);
  const [password, setPassword] = useState(defaultState);
  const [showToast, setShowToast] = useState(false);
  const history = useHistory();

  const toggleToast = () => {
    setShowToast(!showToast);
    while (user.loading) {
      // setShowToast(true);
    }
    delayToast();
  };

  const delayToast = () => {
    setTimeout(() => {
      setShowToast(false);
    }, 1000);
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    if (email.valid && password.valid) {
      loginUser({ email: email.value, password: password.value });
      toggleToast();
    }
  };

  useEffect(() => {
    if (!showToast && user.loggedIn && user.user.userType === "admin") {
      setTimeout(() => {
        history.push("/admin");
      }, 500);
    } else if (!showToast && user.loggedIn && user.user.userType !== "admin") {
      setTimeout(() => {
        history.push("/");
      }, 500);
    }
  }, [user, showToast]);

  useEffect(() => {
    setEmail(
      signed.user.email !== undefined
        ? { value: signed.user.email, valid: true, err: "" }
        : defaultState
    );
  }, [signed]);

  useEffect(() => {
    console.log("USER ", user);
  }, [user]);

  return (
    <>
      <div className="form-container">
        <Form className="grid-col-1">
          <InputField
            label="Email ID"
            id="email"
            type="email"
            name="email"
            value={email.value}
            onChange={(e) => setEmail({ ...email, value: e.target.value })}
            onBlur={() =>
              validate({
                field: "email",
                value: email.value,
                setState: setEmail,
              })
            }
            error={email.err}
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
          <Button
            className="btn btn-login"
            btnName="Login"
            onClick={loginHandler}
          />
        </Form>
        <p className="no-account">
          Don't have an account <Link to="/SignUp">Register here!</Link>
        </p>
      </div>
      <Toast show={showToast} onClose={toggleToast} className="toast-bg mt-5">
        <Toast.Header closeButton={true}>
          {user.loggedIn && (
            <strong className="me-auto">LoggedIn Successfully...</strong>
          )}
          {user.loading && <strong className="me-auto">Loading</strong>}
          {!user.loggedIn && user.error !== "" && (
            <strong className="me-auto">Login Failed</strong>
          )}
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
        {user.loggedIn &&
          !user.loading &&
          user["user"]["userType"] === "admin" && (
            <Toast.Body>Hello, {user.user.name}.</Toast.Body>
          )}
        {user.error && !user.loading && (
          <Toast.Body>
            <p>{user.error}</p>
            <p>Your request is failure try again...</p>{" "}
          </Toast.Body>
        )}
      </Toast>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.Login,
    signed: state.SignUp,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (loginData) => dispatch(login(loginData)),
    setMentorship: (mentorId) => dispatch(setMentorshipDetails(mentorId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

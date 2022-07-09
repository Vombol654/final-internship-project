import { Fragment, useEffect, useState } from "react";
import Modal from "react-modal";
import HeaderCartButton from "./Cart/HeaderCartButton";
import "../Styles/header.css";
import Icons from "../Images/logo.svg";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";

import { logout } from "../store/action/loginAction";
import UserDropdown from "./userDropdown";

const Header = ({ loginData, logoutUser }) => {
  const [toggle, setToggle] = useState(false);

  const { user, loggedIn } = loginData;

  useEffect(() => {
    console.log(toggle);
  }, [toggle]);

  useEffect(() => {
    // if (!loginData.loggedIn) {
    //   console.log("Logout");
    //   if (
    //     history.location.pathname !== "/Login" &&
    //     history.location.pathname !== "/"
    //   )
    //     history.push("/");
    // }
  }, [loginData]);

  return (
    <Fragment>
      <header className="content-top">
        <div className="container-fluid">
          <nav className="nav-bar navbar-expand-lg">
            <a className="navbar-brand logo" href="#">
              <img src={Icons} alt="" width="50" height="40" />
            </a>
            <button
              className="navbar-toggler"
              type="button"
              // data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span
                className="navbar-toggler-icon"
                onClick={() => setToggle(!toggle)}
              >
                <i className="fa-solid fa-bars"></i>
              </span>
            </button>
            <div
              className={`collapse navbar-collapse nav-right justify-content-end ${
                toggle ? "show" : ""
              }`}
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mb-2 mb-lg-0">
                <li className="nav-item">
                  {user["userType"] !== "admin" && (
                    <Link className="nav-link" to="/">
                      Home
                    </Link>
                  )}
                </li>
                {user["userType"] === "mentee" && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/filter">
                      Mentors
                    </Link>
                  </li>
                )}
                {user["userType"] === "mentee" && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/MyMentors">
                      My Mentors
                    </Link>
                  </li>
                )}
                {user["userType"] === "mentor" && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/Courses">
                      Courses
                    </Link>
                  </li>
                )}
                {user["userType"] === "mentor" && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/myMentorships">
                      My Mentorships
                    </Link>
                  </li>
                )}
                {user["userType"] === "mentor" && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/MentorRequest">
                      All Requests
                    </Link>
                  </li>
                )}
                {!loggedIn && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/SignUp">
                      SignUp
                    </Link>
                  </li>
                )}
                {!loggedIn && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/Login">
                      Login
                    </Link>
                  </li>
                )}
                {loggedIn && <UserDropdown />}
              </ul>
            </div>
          </nav>
        </div>
      </header>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    loginData: state.Login,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logoutUser: () => dispatch(logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);

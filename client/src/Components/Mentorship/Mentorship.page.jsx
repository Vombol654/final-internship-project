import { connect } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import queryString from "query-string";

import "./Mentorship.page.css";
import { useEffect } from "react";
import { useState } from "react";
import Button from "../Button";

const Mentorship = ({ mentorshipData }) => {
  const location = useLocation();
  const qs = queryString.parse(location.search);
  const { mentorshipId, courseName } = qs;
  const history = useHistory();

  const [mentorship, setMentorship] = useState({
    totalIntake: 0,
    totalRegistered: 0,
    cost: 0,
    curriculum: [],
    services: [],
    mentees: [],
  });

  const [menteeDetails, setMenteeDetails] = useState([]);

  useEffect(() => {
    setMentorship(
      mentorshipData.mentorships.find((mentorship) => {
        return mentorship._id === mentorshipId;
      })
    );
  }, []);

  useEffect(() => {
    mentorship.mentees.map(async ({ _id, status }) => {
      getMenteeDetails(_id, status);
    });
  }, [mentorship]);

  useEffect(() => {
    console.log(menteeDetails);
  }, [menteeDetails]);

  const getMenteeDetails = async (_id, status) => {
    fetch(`http://localhost:8085/user/${_id}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log("getMenteeDetails ", data[0]);
        setMenteeDetails([...menteeDetails, { ...data[0], status }]);
      });
  };

  return (
    <div className="mentorship-page-container">
      <div className="navigation-list">
        <Link to="/">
          <ion-icon class="md hydrated icon" name="home"></ion-icon>
        </Link>
        <span className="right-icon">&#10095;</span>
        <Link onClick={() => history.goBack()}>My Mentorships</Link>
        <span className="right-icon">&#10095;</span>
        <Link
          to={`/Mentorship?mentorshipId=${mentorshipId}&courseName=${courseName}`}
        >
          {courseName}
        </Link>
        {/* </div> */}
      </div>
      <div className="mentorship-details">
        <div className="mentorship-course">
          <p>Course Name</p>
          <span>{courseName}</span>
        </div>
        <div className="mentorship-course">
          <p>Total Intake</p>
          <span>{mentorship.totalIntake}</span>
        </div>
        <div className="mentorship-course">
          <p>Total Registered</p>
          <span>{mentorship.totalRegistered}</span>
        </div>
        <div className="mentorship-course">
          <p>Price</p>
          <span>₹ {mentorship.cost}</span>
        </div>
        <div className="mentorship-curriculums">
          <p>Curriculum</p>
          {/* <div className="curriculums"> */}
          <span>
            {mentorship.curriculum.map((curriculum, i) =>
              i !== 0 ? ` , ${curriculum}` : curriculum
            )}
          </span>
          {/* </div> */}
        </div>
        <div className="mentorship-curriculums">
          <p>Services Provided</p>
          {/* <div className="curriculums"> */}
          <span>
            {mentorship.services.map((service, i) =>
              i !== 0 ? ` , ${service}` : service
            )}
          </span>
          {/* </div> */}
        </div>
        <div className="mentorship-course">
          <p>Calls offered per month</p>
          <span>{mentorship.callCount}</span>
        </div>
      </div>
      <div className="mentorship-mentee-details">
        <p>Mentee's Details</p>
        {mentorship.mentees.length > 0 ? (
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Sl.No</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {menteeDetails.map((mentee, i) => {
                console.log(mentee, i);
                const { firstname, lastname, email, status } = mentee;
                return (
                  <tr key={i}>
                    <th scope="row">{i + 1}</th>
                    <td>
                      {firstname} {lastname}
                    </td>
                    <td>{email}</td>
                    <td>{status}</td>
                    <td>
                      {status.toLowerCase() === "proposed" ? (
                        <Button
                          btnName="Go to Request Page"
                          className="btn btn-danger"
                          onClick={() => history.push("/MentorRequest")}
                        />
                      ) : (
                        <span>No action required</span>
                        // <Button
                        //   btnName="Read More"
                        //   className="btn btn-success"
                        //   // onClick={() => handleNavigate(_id, courseName)}
                        // />
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p>No Mentee's Applied yet...</p>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    mentorshipData: state.Mentor,
    // coursesData: state.Courses,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // logoutUser: () => dispatch(logout()),
    // getCourses: () => dispatch(getCourses()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Mentorship);

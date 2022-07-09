import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getCourses } from "../../store/action/coursesAction";
import { actionOnProposal } from "../../store/action/mentorAction";
import Button from "../Button";
import Loading from "../Loading";
import "./MentorRequest.page.css";

const MentorRequest = ({
  mentorshipData,
  coursesData,
  getAllCourses,
  rejectProposal,
  acceptProposal,
}) => {
  const [mentees, setMentees] = useState([]);
  const [menteeDetails, setMenteeDetails] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    let proposedMentees = [];
    mentorshipData.mentorships.map((mentorship) => {
      mentorship.mentees.map((mentee) => {
        if (mentee.status === "proposed") {
          proposedMentees.push({
            mentee_id: mentee._id,
            mentee_status: mentee.status,
            ...mentorship,
          });
        }
      });
      // proposedMentees = [...proposedMentees, ...data];
    });
    // console.log(proposedMentees);
    getAllCourses();
    setMentees([...mentees, ...proposedMentees]);
  }, []);

  useEffect(() => {
    console.log(mentees);
    mentees.map((mentee) => {
      fetch(`http://localhost:8085/user/${mentee.mentee_id}`)
        .then((res) => res.json())
        .then((data) => {
          setMenteeDetails([
            ...menteeDetails,
            { mentee: { ...data[0] }, ...mentee },
          ]);
        });
    });
  }, [mentees]);

  useEffect(() => {
    console.log(menteeDetails);
  }, [menteeDetails]);

  useEffect(() => {
    setCourses(coursesData.courses);
  }, [coursesData]);

  const getCourseName = (id) => {
    const course = courses.find((course) => {
      return course._id === id;
    });
    return course.name;
  };

  const removeMentee = (mentee_id) => {
    let remainMentees = mentees.filter((mentee) => {
      return mentee.mentee_id !== mentee_id;
    });

    setMentees(remainMentees);
  };

  const handleReject = (mentorship_id, mentee_id) => {
    rejectProposal({ mentorship_id, mentee_id, status: "reject" });
    removeMentee(mentee_id);
  };

  const handleAccept = (mentorship_id, mentee_id) => {
    acceptProposal({ mentorship_id, mentee_id, status: "accepted" });
    removeMentee(mentee_id);
  };

  return (
    <>
      <div className="mentees-request-container">
        {mentees.length === 0 && (
          <p className="no-request">Currently No Requests Arrived </p>
        )}
        {mentees.length > 0 &&
          menteeDetails.length > 0 &&
          menteeDetails.map((mentorship) => {
            let courseName =
              courses.length > 0 ? getCourseName(mentorship.course_id) : "";
            return (
              <div className="mentee-card">
                <div className="card-top">
                  <img
                    src={`${mentorship.mentee.imageUrl}`}
                    alt={mentorship.mentee.firstname}
                  />
                </div>
                <div className="card-middle">
                  <p>Name : </p>
                  <p>
                    {mentorship.mentee.firstname} {mentorship.mentee.lastname}
                  </p>
                  <p>Email ID : </p>
                  <p>{mentorship.mentee.email}</p>
                  <p>Proposed Course : </p>
                  <p>{courseName}</p>
                </div>
                <div className="card-bottom">
                  <Button
                    btnName="Reject"
                    className="btn btn-danger"
                    onClick={() =>
                      handleReject(mentorship._id, mentorship.mentee._id)
                    }
                  />
                  <Button
                    btnName="Accept"
                    className="btn btn-success"
                    onClick={() =>
                      handleAccept(mentorship._id, mentorship.mentee._id)
                    }
                  />
                </div>
              </div>
            );
          })}
        {mentees.length !== 0 && menteeDetails.length === 0 && (
          <Loading content="Fetching Data please wait..." />
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    mentorshipData: state.Mentor,
    coursesData: state.Courses,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllCourses: () => dispatch(getCourses()),
    rejectProposal: (data) => dispatch(actionOnProposal(data)),
    acceptProposal: (data) => dispatch(actionOnProposal(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MentorRequest);

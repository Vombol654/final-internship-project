import { useState } from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { getCourses } from "../../store/action/coursesAction";
import { deleteMentorship } from "../../store/action/mentorAction";
import Button from "../Button";
import Loading from "../Loading";
import "./MyMentors.page.css";

const MyMentors = ({
  mentorshipData,
  mentee,
  getAllCourses,
  coursesData,
  deleteMentorship,
}) => {
  const [mentorships, setMentorships] = useState([]);
  const history = useHistory();
  useEffect(() => {
    getAllCourses();
    setMentorships(mentorshipData.mentorships);
  }, []);

  useEffect(() => {
    setMentorships(mentorshipData.mentorships);
  }, [mentorshipData]);

  const getCourseName = (id) => {
    const course = coursesData.courses.find((course) => {
      return course._id === id;
    });
    return course.name;
  };

  const getStatus = (mentorship) => {
    let status = mentorship.mentees.find((m) => {
      return m._id === mentee.user._id;
    }).status;

    return status;
  };

  const handleRecall = (_id, mentee_id) => {
    console.log(_id, mentee_id);
    fetch("http://localhost:8085/mentorshipdetail/mentee/remove/propose", {
      method: "PATCH",
      body: JSON.stringify({ _id, mentee_id }),
      headers: { "Content-type": "application/json" },
    })
      .then((res) => res.json())
      .then(({ message, mentorship }) => {
        console.log(message, mentorship);
        if (message === "Proposal Recalled") deleteMentorship(_id);
      });
  };

  const handlePayment = (mentorship) => {
    setPaymentData(mentorship)
      .then((res) => {
        if (res === "start payment") {
          history.push("/payment");
        } else {
          alert(res);
        }
      })
      .catch((err) => alert(err));
  };

  const setPaymentData = async (mentorship) => {
    return new Promise((resolve, reject) => {
      sessionStorage.setItem("mentorName", mentorship.mentor.name);
      sessionStorage.setItem("mentorship_id", mentorship._id);
      sessionStorage.setItem(
        "menteeName",
        `${mentee.user.firstname} ${mentee.user.lastname}`
      );
      sessionStorage.setItem("mentee_id", mentee.user._id);
      sessionStorage.setItem("amount", mentorship.cost);

      if (sessionStorage.getItem("amount")) {
        resolve("start payment");
      } else {
        reject("failed to start payment");
      }
    });
  };

  return (
    <div className="mentorships-container">
      {coursesData.loading ||
        (coursesData.courses.length === 0 && (
          <Loading content="Fetching Data please wait..." />
        ))}
      {!coursesData.loading &&
        coursesData.courses.length > 0 &&
        mentorshipData.mentorships.map((mentorship) => {
          let status = getStatus(mentorship);
          return (
            <div className="mentorship-card" key={mentorship._id}>
              <div className="card-img">
                <img
                  src={mentorship.mentor.imageUrl}
                  alt={mentorship.mentor.name}
                />
              </div>
              <div className="card-details">
                <p className="card-detail">Mentor Name </p>
                <p>{mentorship.mentor.name}</p>
                <p className="card-detail">Course Name </p>
                <p>{getCourseName(mentorship.course_id)}</p>
                <p className="card-detail">Curriculum </p>
                <p>
                  {mentorship.curriculum.map((c, i) => {
                    return i === 0 ? c : `, ${c}`;
                  })}
                </p>
                <p className="card-detail">Status </p>
                <p>{status}</p>
              </div>
              <div className="card-btn-section">
                {status === "confirmed" ? (
                  <Button
                    btnName="Go to Mentor"
                    className="btn btn-go"
                    onClick={() =>
                      history.push(
                        `/details?mentorShipId=${mentorship._id}&mentorId=${mentorship.mentor._id}`
                      )
                    }
                  />
                ) : (
                  <>
                    <Button
                      btnName="Recall"
                      title="Your proposal will be recalled"
                      className="btn btn-danger"
                      onClick={() =>
                        handleRecall(mentorship._id, mentee.user._id)
                      }
                    />
                    {status === "accepted" ? (
                      <Button
                        btnName="Start Payment"
                        title="Your proposal accepted by Mentor you're ready pay"
                        className="btn btn-success"
                        onClick={() => handlePayment(mentorship)}
                      />
                    ) : (
                      <Button
                        className="btn btn-go"
                        btnName="Proposed"
                        style={{ cursor: "not-allowed" }}
                        title="Your proposal not yet accepted by Mentor please check sometime later"
                      />
                    )}
                  </>
                )}
              </div>
            </div>
          );
        })}

      {mentorshipData.mentorships.length === 0 && (
        <p className="no-results">Your Mentorship Bucket is Empty... </p>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    mentorshipData: state.Mentor,
    mentee: state.Login,
    coursesData: state.Courses,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllCourses: () => dispatch(getCourses()),
    deleteMentorship: (mentorship_id) =>
      dispatch(deleteMentorship(mentorship_id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyMentors);

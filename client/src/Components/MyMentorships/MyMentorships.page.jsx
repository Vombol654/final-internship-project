import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { getCourses } from "../../store/action/coursesAction";
import Button from "../Button";
import Loading from "../Loading";

import "./MyMentorships.page.css";

const MyMentorships = ({ mentorshipData, coursesData, getAllCourses }) => {
  const [courses, setCourses] = useState([]);
  const [mentorships, setMentorships] = useState([]);
  // const [courseName,setCourseName]=useState("");

  const history = useHistory();

  const handleNavigate = (mentorshipId, courseName) => {
    history.push(
      `/Mentorship?mentorshipId=${mentorshipId}&courseName=${courseName}`
    );
  };

  useEffect(() => {
    getAllCourses();
  }, []);

  useEffect(() => {
    setCourses(coursesData.courses);
    setMentorships(mentorshipData.mentorships);
  }, [coursesData]);

  useEffect(() => {
    console.log(mentorships);
    getAllCourses();
  }, [mentorships]);

  const getCourseName = (id) => {
    const course = courses.find((course) => {
      return course._id === id;
    });
    return course.name;
  };

  return (
    <>
      {coursesData.loading ||
        (courses.length === 0 && (
          <Loading content="Fetching Data please wait..." />
        ))}

      {!coursesData.loading && courses.length > 0 && mentorships.length > 0 && (
        <div className="myMentorship-container">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Sl.No</th>
                <th scope="col">Course Name</th>
                <th scope="col">Total Intake</th>
                <th scope="col">Total Registered</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {mentorships.map(
                (
                  { _id, course_id, totalIntake, totalRegistered, status },
                  i
                ) => {
                  let courseName =
                    coursesData.courses.length > 0
                      ? getCourseName(course_id)
                      : "";
                  return (
                    // <div className="mentorship-details">

                    <tr>
                      <th scope="row">{i + 1}</th>
                      <td>{courseName}</td>
                      <td>{totalIntake}</td>
                      <td>{totalRegistered}</td>
                      <td>{status}</td>
                      <td>
                        {status.toLowerCase() === "reject" ? (
                          <Button btnName="Delete" className="btn btn-danger" />
                        ) : (
                          <Button
                            btnName="Read More"
                            onClick={() => handleNavigate(_id, courseName)}
                          />
                        )}
                      </td>
                    </tr>

                    // </div>
                  );
                }
              )}
            </tbody>
          </table>
        </div>
      )}
      {!coursesData.loading && mentorships.length === 0 && (
        <p>Your Mentorship Bucket is Empty...</p>
      )}
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
    // logoutUser: () => dispatch(logout()),
    getAllCourses: () => dispatch(getCourses()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyMentorships);

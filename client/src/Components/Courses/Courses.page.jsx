import { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { getCourses } from "../../store/action/coursesAction";
import CourseCard from "../CourseCard";
import Loading from "../Loading";

import "./Courses.page.css";

const Courses = ({ coursesData, myData, mentor, getCourses }) => {
  const { user } = myData;
  const { mentorships } = mentor;

  useEffect(() => {
    getCourses();
  }, []);

  return (
    <div className="courses-grid">
      {coursesData.loading && <Loading content="Get Courses" />}
      {coursesData.error && <h1>Failed to Fetch courses...</h1>}
      {coursesData.courses.map((course) => {
        return (
          <CourseCard
            key={course._id}
            course={course}
            user={user}
            mentorships={mentorships}
          />
        );
      })}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    coursesData: state.Courses,
    myData: state.Login,
    mentor: state.Mentor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCourses: () => dispatch(getCourses()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Courses);

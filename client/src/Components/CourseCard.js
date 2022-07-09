import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "../Styles/CourseCard.css";

const CourseCard = ({ course, user, mentorships }) => {
  const { _id, name, image, content, skillsRequired = [], mentors } = course;

  const history = useHistory();

  const redirectToCourseFormPage = async (course) => {
    await pushdataInsessionStorage(course)
      .then((res) => {
        history.push(`/courseform`);
      })
      .catch((err) => alert(err));
  };

  const pushdataInsessionStorage = async (course) => {
    return new Promise(function (resolve, reject) {
      sessionStorage.setItem("course", JSON.stringify(course));
      if (sessionStorage.getItem("course")) {
        resolve("Data set in session Storage");
      } else {
        reject("Sorry for the error...");
      }
    });
  };

  const getStatus = (course_id) => {
    const mentorship = mentorships.find((mentorship) => {
      return mentorship.course_id === course_id;
    });
    return mentorship !== undefined ? mentorship.status : "";
  };

  let status = getStatus(_id);
  return (
    <div className="course-card">
      <div className="course-img">
        <img src={image} alt={name} />
      </div>
      <h1 className="course-title">{name}</h1>
      <div className="skills-expected">
        <h3>Skills Required for this Course</h3>
        <div className="skills">
          {skillsRequired.length === 0 ? (
            <h5>No Requirements Needed...</h5>
          ) : null}
          {skillsRequired.map((skill, i) => {
            return <span key={i}>{skill}</span>;
          })}
        </div>
      </div>
      <p className="summary">{content}</p>
      {status === "accepted" ? (
        <button className="course-apply-btn" disabled>
          Go To Course
        </button>
      ) : status === "proposed" ? (
        <button className="course-apply-btn" disabled>
          Proposed
        </button>
      ) : (
        <button
          className="course-apply-btn"
          onClick={() => redirectToCourseFormPage(course)}
        >
          Apply
        </button>
      )}
    </div>
  );
};

export default CourseCard;

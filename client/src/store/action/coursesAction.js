import { coursesActionType } from "../actionTypes/coursesActionType";

const { GET_COURSES_START, GET_COURSES_SUCCESS, GET_COURSES_FAIL } =
  coursesActionType;

const getCourseStart = () => {
  return {
    type: GET_COURSES_START,
  };
};

const getCourseSuccess = (courses) => {
  return {
    type: GET_COURSES_SUCCESS,
    payload: courses,
  };
};

const getCourseFail = (error) => {
  return {
    type: GET_COURSES_FAIL,
    payload: error,
  };
};

const url = "http://localhost:8085/coursetypes";
export const getCourses = () => {
  console.log("GET_COURSES");
  return (dispatch) => {
    dispatch(getCourseStart());
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        dispatch(getCourseSuccess(data.coursetypes));
      })
      .catch((err) => {
        dispatch(getCourseFail(err));
        alert(err);
      });
  };
};

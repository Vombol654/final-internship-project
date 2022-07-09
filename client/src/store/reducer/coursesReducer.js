import { coursesActionType } from "../actionTypes/coursesActionType";

const initialState = {
  courses: [],
  loading: false,
  error: "",
};

const { GET_COURSES_START, GET_COURSES_SUCCESS, GET_COURSES_FAIL } =
  coursesActionType;

export const coursesReducer = (state = initialState, { type, payload }) => {
  console.log(type);
  switch (type) {
    case GET_COURSES_START:
      return { ...state, loading: true };
    case GET_COURSES_SUCCESS:
      return {
        courses: payload,
        loading: false,
        error: "",
      };

    case GET_COURSES_FAIL:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
};

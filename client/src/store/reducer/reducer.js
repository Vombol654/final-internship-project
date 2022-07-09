import { combineReducers } from "redux";
import { coursesReducer } from "./coursesReducer";
import { loginReducer } from "./loginReducer";
import { mentorReducer } from "./mentorReducer";
import { signupReducer } from "./signupReducer";
import { proposeReducer } from "./proposeReducer";
import { filterReducer } from "../reducer/filterReducer";

export const reducer = combineReducers({
  Login: loginReducer,
  SignUp: signupReducer,
  Mentor: mentorReducer,
  Courses: coursesReducer,
  Proposed: proposeReducer,
  Filter: filterReducer,
});

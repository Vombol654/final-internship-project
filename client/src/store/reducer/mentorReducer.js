import { mentorActionType } from "../actionTypes/mentorActionType";

const {
  SET_MENTOR,
  SET_MENTORSHIPS,
  ADD_MENTORSHIP,
  UPDATE_MENTORSHIP,
  GET_MENTORSHIPS,
  DELETE_MENTORSHIP,
} = mentorActionType;

const initialState = {
  mentor: {},
  mentorships: [],
};

export const mentorReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_MENTOR:
      return { ...state, mentor: payload };

    case SET_MENTORSHIPS:
      console.log(payload);
      return { ...state, mentorships: [...payload] };

    case ADD_MENTORSHIP:
      return { ...state, mentorships: [...state.mentorships, payload] };

    case UPDATE_MENTORSHIP:
      const remainMentorship = state.mentorships.filter((mentorship) => {
        return mentorship._id !== payload._id;
      });
      console.log([...remainMentorship, payload]);
      return { ...state, mentorships: [...remainMentorship, payload] };

    case DELETE_MENTORSHIP:
      const remain = state.mentorships.filter((mentorship) => {
        return mentorship._id !== payload;
      });
      console.log(remain);
      return { ...state, mentorships: remain };

    case GET_MENTORSHIPS:
      return { state };
    default:
      return state;
  }
};

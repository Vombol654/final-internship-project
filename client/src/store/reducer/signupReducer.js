import { signupActionType } from "../actionTypes/signupActionType";

const initialState = {
  user: {},
  loading: false,
  error: "",
  signed: false,
};

const { SIGNUP_START, SIGNUP_SUCCESS, SIGNUP_FAIL } = signupActionType;

export const signupReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SIGNUP_START:
      return { ...state, loading: true };

    case SIGNUP_SUCCESS:
      return { user: payload, loading: false, signed: true, error: "" };

    case SIGNUP_FAIL:
      return { ...state, loading: false, signed: false, error: payload };
    default:
      return state;
  }
};

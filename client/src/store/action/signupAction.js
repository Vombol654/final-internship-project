import { signupActionType } from "../actionTypes/signupActionType";

const { SIGNUP_START, SIGNUP_SUCCESS, SIGNUP_FAIL } = signupActionType;

const signupStart = () => {
  return {
    type: SIGNUP_START,
  };
};

const signupSuccess = (user) => {
  return {
    type: SIGNUP_SUCCESS,
    payload: user,
  };
};

const signupFail = (error) => {
  return {
    type: SIGNUP_FAIL,
    payload: error,
  };
};

export const signup = (user) => {
  var url = "http://localhost:8085/signup/";
  url += user.userType === "mentee" ? "mentee" : "mentor";

  return (dispatch) => {
    dispatch(signupStart());
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        ...user,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then(({ message, user }) => {
        if (message === "user registered  successfully")
          dispatch(signupSuccess(user));
        else dispatch(signupFail(message));
      })
      .catch((err) => {
        dispatch(signupFail(err));
      });
  };
};

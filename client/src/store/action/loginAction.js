import { loginActionType } from "../actionTypes/loginActionType";
import {
  setMentorshipDetails,
  setMentorshipDetailsByMenteeId,
} from "./mentorAction";

const { LOGIN_START, LOGIN_SUCCESS, LOGIN_FAIL, UPDATE_USER, LOGOUT } =
  loginActionType;

const loginStart = () => {
  return {
    type: LOGIN_START,
  };
};

const loginSuccess = (user) => {
  return {
    type: LOGIN_SUCCESS,
    payload: user,
  };
};

const loginFail = (error) => {
  return {
    type: LOGIN_FAIL,
    payload: error,
  };
};

const updateUser = (user) => {
  return {
    type: UPDATE_USER,
    payload: user,
  };
};

export const login = (user) => {
  const url = "http://localhost:8085/login";
  return (dispatch) => {
    dispatch(loginStart());
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        ...user,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.isAuthenticated) {
          dispatch(loginSuccess(data.user));
          if (data.user.userType === "mentor") {
            dispatch(setMentorshipDetails(data.user._id));
          } else if (data.user.userType === "mentee") {
            dispatch(setMentorshipDetailsByMenteeId(data.user._id));
          }
        } else {
          dispatch(loginFail(data.message));
        }
      })
      .catch((err) => {
        dispatch(loginFail(err));
        alert(err);
      });
  };
};

export const logout = () => {
  return { type: LOGOUT };
};

export const update = (user) => {
  const url =
    user.userType === "mentee"
      ? "http://localhost:8085/user/update"
      : "http://localhost:8085/mentor/update";
  return (dispatch) => {
    fetch(url, {
      method: "PATCH",
      body: JSON.stringify({ ...user }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then(({ message, user }) => {
        console.log(message);
        if (message === "Updated Successfully...") {
          dispatch(updateUser(user));
        } else {
          alert(message);
        }
      })
      .catch((err) => alert(err));
  };
};

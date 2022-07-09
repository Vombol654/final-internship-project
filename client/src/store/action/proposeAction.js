import { proposeActionType } from "../actionTypes/proposeActionType";
import { addMentorship, updateMentorship } from "./mentorAction";

const { PROPOSAL_START, PROPOSAL_SUCCESS, PROPOSAL_FAIL } = proposeActionType;

const proposeStart = () => {
  return {
    type: PROPOSAL_START,
  };
};

const proposeSuccess = (course) => {
  return {
    type: PROPOSAL_SUCCESS,
    payload: course,
  };
};

const proposeFail = (error) => {
  return {
    type: PROPOSAL_FAIL,
    payload: error,
  };
};

export const propose = (data, proposefrom) => {
  const url =
    proposefrom === "mentor"
      ? "http://localhost:8085/mentorshipdetail"
      : "http://localhost:8085/mentorshipdetail/mentee/propose";
  console.log(data);
  return (dispatch) => {
    dispatch(proposeStart());
    fetch(url, {
      method: proposefrom === "mentor" ? "POST" : "PATCH",
      body: JSON.stringify({
        ...data,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then(({ message, mentorship }) => {
        console.log(message);
        if (proposefrom === "mentor" && message === "Proposed successfully") {
          dispatch(proposeSuccess(mentorship));
          dispatch(addMentorship(mentorship));
        } else if (
          proposefrom === "mentee" &&
          message === "Proposed successfully"
        ) {
          dispatch(proposeSuccess(mentorship));
          dispatch(updateMentorship(mentorship));
        } else dispatch(proposeFail(message));
      })
      .catch((err) => {
        dispatch(proposeFail(err));
      });
  };
};

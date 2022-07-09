import { filterActionType } from "../actionTypes/filterActionType";

const { FILTER_START, FILTER_COMPLETE, FILTER_FAIL } = filterActionType;

const filterStart = () => {
  return {
    type: FILTER_START,
  };
};

const filterComplete = (mentorships) => {
  return {
    type: FILTER_COMPLETE,
    payload: mentorships,
  };
};

const filterFail = (error) => {
  return {
    type: FILTER_FAIL,
    payload: error,
  };
};

export const filter = (filterObj) => {
  return (dispatch) => {
    dispatch(filterStart());
    fetch("http://localhost:8085/filter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(filterObj),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        dispatch(filterComplete(data));
      })
      .catch((err) => {
        dispatch(filterFail(err));
        console.log(err);
      });
  };
};

import { mentorActionType } from "../actionTypes/mentorActionType";

const {
  SET_MENTOR,
  SET_MENTORSHIPS,
  GET_MENTORSHIPS,
  ADD_MENTORSHIP,
  UPDATE_MENTORSHIP,
  DELETE_MENTORSHIP,
} = mentorActionType;

export const setMentor = (mentor) => {
  return {
    type: SET_MENTOR,
    payload: mentor,
  };
};

const setMentorships = (mentorships) => {
  return {
    type: SET_MENTORSHIPS,
    payload: mentorships,
  };
};

export const addMentorship = (mentorship) => {
  return {
    type: ADD_MENTORSHIP,
    payload: mentorship,
  };
};

export const updateMentorship = (mentorship) => {
  return {
    type: UPDATE_MENTORSHIP,
    payload: mentorship,
  };
};

export const deleteMentorship = (mentorship_id) => {
  return {
    type: DELETE_MENTORSHIP,
    payload: mentorship_id,
  };
};
export const getMentorships = () => {
  return {
    type: GET_MENTORSHIPS,
  };
};

export const setMentorshipDetails = (mentorId) => {
  return (dispatch) => {
    fetch(`http://localhost:8085/mentorshipdetail/${mentorId}`)
      .then((res) => res.json())
      .then((data) => {
        dispatch(setMentorships(data.mentorship));
      })
      .catch((err) => alert(err));
  };
};

export const setMentorshipDetailsByMenteeId = (menteeId) => {
  return (dispatch) => {
    fetch(`http://localhost:8085/mentorshipdetail/mentee/${menteeId}`)
      .then((res) => res.json())
      .then((data) => {
        dispatch(setMentorships(data.mentorship));
      })
      .catch((err) => alert(err));
  };
};

export const actionOnProposal = (data) => {
  return (dispatch) => {
    fetch(`http://localhost:8085/mentorshipdetail/mentee/action`, {
      method: "PATCH",
      body: JSON.stringify({ ...data }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(updateMentorship(data.mentorship[0]));
      })
      .catch((err) => alert(err));
  };
};

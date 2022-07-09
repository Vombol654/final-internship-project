import { proposeActionType } from "../actionTypes/proposeActionType";

const { PROPOSAL_START, PROPOSAL_SUCCESS, PROPOSAL_FAIL } = proposeActionType;

const initialState = {
  propose: {},
  loading: false,
  proposed: false,
  error: "",
};

export const proposeReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case PROPOSAL_START:
      return { ...state, loading: true };

    case PROPOSAL_SUCCESS:
      return { propose: payload, proposed: true, loading: false, error: "" };

    case PROPOSAL_FAIL:
      return { ...state, proposed: false, loading: false, error: payload };

    default:
      return state;
  }
};

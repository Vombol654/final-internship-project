import { filterActionType } from "../actionTypes/filterActionType";

const { FILTER_START, FILTER_COMPLETE, FILTER_FAIL } = filterActionType;

const initialState = {
  filteredData: [],
  loading: false,
  filtered: false,
  pageCount: 0,
  error: "",
};

export const filterReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FILTER_START:
      return { ...state, loading: true };

    case FILTER_COMPLETE:
      console.log(payload);
      const { mentorships, pages } = payload;
      return {
        ...state,
        filteredData: mentorships,
        loading: false,
        filtered: true,
        pageCount: pages,
        error: "",
      };

    case FILTER_FAIL:
      return { ...state, loading: false, filtered: false, error: payload };
    default:
      return state;
  }
};

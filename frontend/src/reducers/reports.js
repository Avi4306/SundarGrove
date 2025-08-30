import {
  REPORT_START,
  REPORT_SUCCESS,
  REPORT_FAIL,
  REPORT_LIST_SUCCESS,
} from "../constants/actionTypes";

const initialState = {
  loading: false,
  reports: [],
  error: null,
};

const reports = (state = initialState, action) => {
  switch (action.type) {
    case REPORT_START:
      return { ...state, loading: true, error: null };
    case REPORT_SUCCESS:
      return {
        ...state,
        loading: false,
        reports: [...state.reports, action.payload], // append new report
      };
    case REPORT_LIST_SUCCESS:
      return { ...state, loading: false, reports: action.payload };
    case REPORT_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default reports;
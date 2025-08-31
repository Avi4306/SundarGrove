// src/reducers/admin.js (New file for admin-related reducer)
import {
  FETCH_ALL_USERS_REQUEST,
  FETCH_ALL_USERS_SUCCESS,
  FETCH_ALL_USERS_FAILURE,
  DELETE_USER_SUCCESS,
  UPDATE_USER_ROLE_SUCCESS,
  FETCH_REPORTS_REQUEST,
  FETCH_REPORTS_SUCCESS,
  FETCH_REPORTS_FAILURE,
  VERIFY_REPORT_SUCCESS,
  REJECT_REPORT_SUCCESS,
  SET_USER_COUNT,
  SET_ALL_REQUESTS
} from '../constants/actionTypes';

const initialState = {
  allUsers: [],
  reports: [],
  loading: false,
  error: null,
  userCount : 0,
  allRequests: [],
};

function admin(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case FETCH_ALL_USERS_REQUEST:
    case FETCH_REPORTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_ALL_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        allUsers: payload,
      };
    case FETCH_REPORTS_SUCCESS:
      return {
        ...state,
        loading: false,
        reports: payload,
      };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        allUsers: state.allUsers.filter((user) => user._id !== payload),
      };
    case UPDATE_USER_ROLE_SUCCESS:
      return {
        ...state,
        allUsers: state.allUsers.map((user) =>
          user._id === payload._id ? payload : user
        ),
      };
    case VERIFY_REPORT_SUCCESS:
      return {
        ...state,
        reports: state.reports.filter((report) => report._id !== payload),
      };
    case REJECT_REPORT_SUCCESS:
      return {
        ...state,
        reports: state.reports.filter((report) => report._id !== payload),
      };
    case FETCH_ALL_USERS_FAILURE:
    case FETCH_REPORTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case SET_USER_COUNT:
      return { ...state, userCount: action.payload };
    case SET_ALL_REQUESTS:
      return { ...state, allRequests: action.payload };
    default:
      return state;
  }
}

export default admin;
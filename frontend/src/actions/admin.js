import * as api from '../api/index';

import {
  FETCH_ALL_USERS_REQUEST,
  FETCH_ALL_USERS_SUCCESS,
  FETCH_ALL_USERS_FAILURE,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
  UPDATE_USER_ROLE_REQUEST,
  UPDATE_USER_ROLE_SUCCESS,
  UPDATE_USER_ROLE_FAILURE,
  FETCH_REPORTS_REQUEST,
  FETCH_REPORTS_SUCCESS,
  FETCH_REPORTS_FAILURE,
  VERIFY_REPORT_REQUEST,
  VERIFY_REPORT_SUCCESS,
  VERIFY_REPORT_FAILURE,
  REJECT_REPORT_REQUEST,
  REJECT_REPORT_SUCCESS,
  REJECT_REPORT_FAILURE,
  SET_USER_COUNT,
  SET_ALL_REQUESTS
} from '../constants/actionTypes';

// Fetch all users
export const fetchAllUsers = () => async (dispatch) => {
  dispatch({ type: FETCH_ALL_USERS_REQUEST });
  try {
    const { data } = await api.getAllUsers();
    dispatch({ type: FETCH_ALL_USERS_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: FETCH_ALL_USERS_FAILURE,
      payload: err.response?.data?.message || err.message,
    });
  }
};

// Delete a user
export const deleteUser = (userId) => async (dispatch) => {
  dispatch({ type: DELETE_USER_REQUEST });
  try {
    await api.deleteUser(userId);
    dispatch({ type: DELETE_USER_SUCCESS, payload: userId });
  } catch (err) {
    dispatch({
      type: DELETE_USER_FAILURE,
      payload: err.response?.data?.message || err.message,
    });
  }
};

// Update a user's role
export const updateUserRole = (userId, newRole) => async (dispatch) => {
  dispatch({ type: UPDATE_USER_ROLE_REQUEST });
  try {
    const { data } = await api.updateUserRole(userId, newRole);
    dispatch({ type: UPDATE_USER_ROLE_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: UPDATE_USER_ROLE_FAILURE,
      payload: err.response?.data?.message || err.message,
    });
  }
};

// Fetch all reports
export const fetchReports = () => async (dispatch) => {
  dispatch({ type: FETCH_REPORTS_REQUEST });
  try {
    const { data } = await api.getAdminReports();
    dispatch({ type: FETCH_REPORTS_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: FETCH_REPORTS_FAILURE,
      payload: err.response?.data?.message || err.message,
    });
  }
};

// Verify a report
export const verifyReport = (reportId) => async (dispatch) => {
  dispatch({ type: VERIFY_REPORT_REQUEST });
  try {
    await api.verifyReport(reportId);
    dispatch({ type: VERIFY_REPORT_SUCCESS, payload: reportId });
  } catch (err) {
    dispatch({
      type: VERIFY_REPORT_FAILURE,
      payload: err.response?.data?.message || err.message,
    });
  }
};

// Reject a report
export const rejectReport = (reportId) => async (dispatch) => {
  dispatch({ type: REJECT_REPORT_REQUEST });
  try {
    await api.rejectReport(reportId);
    dispatch({ type: REJECT_REPORT_SUCCESS, payload: reportId });
  } catch (err) {
    dispatch({
      type: REJECT_REPORT_FAILURE,
      payload: err.response?.data?.message || err.message,
    });
  }
};

export const fetchUserCount = () => async (dispatch) => {
  try {
    const { data } = await api.getUserCount();
    dispatch({ type: SET_USER_COUNT, payload: data.count });
  } catch (error) {
    console.error("Failed to fetch user count:", error);
  }
};

export const fetchAllRequests = () => async (dispatch) => {
  try {
    const { data } = await api.getAllRequests();
    dispatch({ type: SET_ALL_REQUESTS, payload: data });
  } catch (error) {
    console.error("Failed to fetch all requests:", error);
  }
};
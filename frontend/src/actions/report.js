import { createReport, getReports } from "../api/index";
import {
  REPORT_START,
  REPORT_SUCCESS,
  REPORT_FAIL,
  REPORT_LIST_SUCCESS,
} from "../constants/actionTypes";

// Create new report
export const handleCreateReport = (reportData) => async (dispatch) => {
  dispatch({ type: REPORT_START });
  try {
    const { data } = await createReport(reportData);
    dispatch({ type: REPORT_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: REPORT_FAIL,
      payload: err.response?.data?.message || err.message,
    });
  }
};

// Fetch all reports (for authority/admin dashboards)
export const fetchReports = async (dispatch) => {
  dispatch({ type: REPORT_START });
  try {
    const { data } = await getReports();
    dispatch({ type: REPORT_LIST_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: REPORT_FAIL,
      payload: err.response?.data?.message || err.message,
    });
  }
};
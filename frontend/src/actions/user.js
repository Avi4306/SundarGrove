import { registerUser, loginUser, getProfile, updateProfile } from "../api/index";
import { AUTH_START, AUTH_SUCCESS, AUTH_FAIL, LOGOUT } from "../constants/actionTypes";

// Register
export const handleRegister = (formData) => async (dispatch) => {
  dispatch({ type: AUTH_START });
  try {
    const { data } = await registerUser(formData);
    localStorage.setItem("token", data.token);
    dispatch({ type: AUTH_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: AUTH_FAIL, payload: err.response?.data?.message || err.message });
  }
};

// Login
export const handleLogin = (formData, navigate) => async (dispatch) => {
  dispatch({ type: AUTH_START });
  try {
    const { data } = await loginUser(formData);
    localStorage.setItem("token", data.token);
    dispatch({ type: AUTH_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: AUTH_FAIL, payload: err.response?.data?.message || err.message });
  }
};

// Get profile
export const fetchProfile = () => async (dispatch) => {
  dispatch({ type: AUTH_START });
  try {
    const { data } = await getProfile();
    dispatch({
      type: AUTH_SUCCESS,
      payload: { user: data, token: localStorage.getItem("token") },
    });
  } catch (err) {
    dispatch({ type: AUTH_FAIL, payload: err.response?.data?.message || err.message });
  }
};

// Logout
export const logout = () => (dispatch) => {
  localStorage.removeItem("token");
  dispatch({ type: LOGOUT });
};

export const updatePf = (formData) => async (dispatch) => {
  try {
    const { data } = await updateProfile(formData);
    dispatch({ type: AUTH_SUCCESS, payload: {user : data} });
    return data;
  } catch (error) {
    throw error;
  }
};
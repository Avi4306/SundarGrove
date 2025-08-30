import { AUTH_START, AUTH_SUCCESS, AUTH_FAIL, LOGOUT } from "../constants/actionTypes";

const initialState = {
  user: null,
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,
  success: false,
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_START:
      return {
        ...state,
        loading: true,
        error: null,
        success: false,
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        token: action.payload.token,
        error: null,
        success: true,
      };
    case AUTH_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
        token: null,
        loading: false,
        error: null,
        success: false,
      };
    default:
      return state;
  }
};

export default auth;
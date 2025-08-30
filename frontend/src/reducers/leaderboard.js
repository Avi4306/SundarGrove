import { TOP_USERS_START, TOP_USERS_SUCCESS, TOP_USERS_FAIL } from "../constants/actionTypes";

const initialState = {
  users: [],
  loading: false,
  error: null,
};

const topUsers = (state = initialState, action) => {
  switch (action.type) {
    case TOP_USERS_START:
      return { ...state, loading: true, error: null };
    case TOP_USERS_SUCCESS:
      return { ...state, loading: false, users: action.payload };
    case TOP_USERS_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default topUsers;
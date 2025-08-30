import {
  PREDICT_START,
  PREDICT_SUCCESS,
  PREDICT_FAIL,
} from "../constants/actionTypes";

const initialState = {
  loading: false,
  result: null,
  error: null,
};

const predict = (state = initialState, action) => {
  switch (action.type) {
    case PREDICT_START:
      return { ...state, loading: true, error: null };
    case PREDICT_SUCCESS:
      return { ...state, loading: false, result: action.payload };
    case PREDICT_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default predict;
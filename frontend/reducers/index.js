import {combineReducers} from 'redux';
import authReducer from './user.js';

export default combineReducers({auth : authReducer});
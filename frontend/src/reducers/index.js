import {combineReducers} from 'redux';
import auth from './user.js';
import reports from './reports.js';

export default combineReducers({auth, reports});
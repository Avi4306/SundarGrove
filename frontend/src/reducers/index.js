import {combineReducers} from 'redux';
import auth from './user.js';
import reports from './reports.js';
import topUsers from './leaderboard.js';

export default combineReducers({auth, reports, topUsers});
import { combineReducers } from 'redux';
import authReducer from './auth/authReducer';
// import errorReducer from './error/errorReducer';
import profileReducer from './profile/profileReducer';
import alertReducer from './alert/alertReducer';

export default combineReducers({
  auth: authReducer,
  // errors: errorReducer,
  profile: profileReducer,
  alert: alertReducer
});

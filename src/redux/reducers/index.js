import { combineReducers } from 'redux';
import holidays from './holidayReducer';
import employees from './employeeReducer';
import currencies from './currencyReducer';
import users from './userReducer';
import apiCallsInProgress from './apiStatusReducer';

const rootReducer = combineReducers({
  users,
  holidays,
  currencies,
  employees,
  apiCallsInProgress,
});

export default rootReducer;

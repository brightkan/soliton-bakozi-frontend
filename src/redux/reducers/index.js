import { combineReducers } from 'redux';
import holidays from './holidayReducer';
import employees from './employeeReducer';
import currencies from './currencyReducer';
import users from './userReducer';
import solitonUsers from './solitonUserReducer'
import apiCallsInProgress from './apiStatusReducer';
import currentEmployee from './currentEmployeeReducer'


const rootReducer = combineReducers({
  solitonUsers,
  users,
  holidays,
  currencies,
  employees,
  apiCallsInProgress,
  currentEmployee
});

export default rootReducer;

import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function employeeReducer(
  state = initialState.currentEmployee,
  action,
) {
  if (action.type === types.SET_CURRENT_EMPLOYEE) {
    return [...state, { ...action.currentEmployee }];
  } else {
    return state;
  }
}

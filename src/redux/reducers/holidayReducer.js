import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function currencyReducer(state = initialState.holidays, action) {
  switch (action.type) {
    case types.CREATE_HOLIDAY_SUCCESS:
      return [...state, { ...action.holiday }];
    case types.UPDATE_HOLIDAY_SUCCESS:
      return state.map(holiday =>
        holiday.id === action.holiday.id ? action.holiday : holiday,
      );
    case types.LOAD_HOLIDAYS_SUCCESS:
      return action.holidays;
    case types.DELETE_HOLIDAY_OPTIMISTIC:
      return state.filter(holiday => holiday.id !== action.holiday.id);
    default:
      return state;
  }
}

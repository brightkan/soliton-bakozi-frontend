import * as types from './actionTypes';
import * as courseApi from '../../api/courseApi';
import { beginApiCall, apiCallError } from './apiStatusActions';

export function loadHolidaySuccess(holidays) {
  return { type: types.LOAD_HOLIDAYS_SUCCESS, holidays };
}

export function createHolidaySuccess(holiday) {
  return { type: types.CREATE_HOLIDAY_SUCCESS, holiday };
}

export function updateHolidaySuccess(holiday) {
  return { type: types.UPDATE_HOLIDAY_SUCCESS, holiday };
}

export function deleteHolidayOptimistic(holiday) {
  return { type: types.DELETE_HOLIDAY_OPTIMISTIC, holiday };
}

export function loadHolidays() {
  return function(dispatch) {
    dispatch(beginApiCall());
    return courseApi
      .getHolidays()
      .then(holidays => {
        dispatch(loadHolidaySuccess(holidays));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function saveHoliday(holiday) {
  //eslint-disable-next-line no-unused-vars
  return function(dispatch, getState) {
    dispatch(beginApiCall());
    return courseApi
      .saveHoliday(holiday)
      .then(savedHoliday => {
        holiday.id
          ? dispatch(updateHolidaySuccess(savedHoliday))
          : dispatch(createHolidaySuccess(savedHoliday));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function deleteHoliday(holiday) {
  return function(dispatch) {
    // Doing optimistic delete, so not dispatching begin/end api call
    // actions, or apiCallError action since we're not showing the loading status for this.
    dispatch(deleteCurrencyOptimistic(holiday));
    return courseApi.deleteEmployee(holiday.id);
  };
}

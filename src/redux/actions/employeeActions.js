import * as types from './actionTypes';
import * as courseApi from '../../api/courseApi';
import { beginApiCall, apiCallError } from './apiStatusActions';

export function loadEmployeeSuccess(courses) {
  return { type: types.LOAD_COURSES_SUCCESS, courses };
}

export function createEmployeeSuccess(course) {
  return { type: types.CREATE_COURSE_SUCCESS, course };
}

export function updateEmployeeSuccess(course) {
  return { type: types.UPDATE_COURSE_SUCCESS, course };
}

export function deleteEmployeeOptimistic(course) {
  return { type: types.DELETE_COURSE_OPTIMISTIC, course };
}

export function loadEmployees() {
  return function(dispatch) {
    dispatch(beginApiCall());
    return courseApi
      .getEmployees()
      .then(employees => {
        dispatch(loadEmployeeSuccess(courses));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function saveEmployee(employee) {
  //eslint-disable-next-line no-unused-vars
  return function(dispatch, getState) {
    dispatch(beginApiCall());
    return courseApi
      .saveCourse(employee)
      .then(savedEmployee => {
        course.id
          ? dispatch(updateEmployeeSuccess(savedEmployee))
          : dispatch(createEmployeeSuccess(savedEmployee));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function deleteEmployee(employee) {
  return function(dispatch) {
    // Doing optimistic delete, so not dispatching begin/end api call
    // actions, or apiCallError action since we're not showing the loading status for this.
    dispatch(deleteEmployeeOptimistic(employee));
    return courseApi.deleteEmployee(employee.id);
  };
}

import * as types from './actionTypes';
import { beginApiCall, apiCallError } from './apiStatusActions';
import { getAllEmployees } from '../../services/employeeService';

export function loadEmployeeSuccess(employees) {
  return { type: types.LOAD_EMPLOYEES_SUCCESS, employees };
}

export function createEmployeeSuccess(employee) {
  return { type: types.CREATE_EMPLOYEE_SUCCESS, employee };
}

export function updateEmployeeSuccess(employee) {
  return { type: types.UPDATE_EMPLOYEE_SUCCESS, employee };
}

export function deleteEmployeeOptimistic(employee) {
  return { type: types.DELETE_EMPLOYEE_OPTIMISTIC, employee };
}

export function loadEmployees() {
  return function(dispatch) {
    dispatch(beginApiCall());
    return getAllEmployees()
      .then(result => {
        dispatch(loadEmployeeSuccess(result.data));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

// export function saveEmployee(employee) {
//   //eslint-disable-next-line no-unused-vars
//   return function(dispatch, getState) {
//     dispatch(beginApiCall());
//     return courseApi
//       .saveCourse(employee)
//       .then(savedEmployee => {
//         course.id
//           ? dispatch(updateEmployeeSuccess(savedEmployee))
//           : dispatch(createEmployeeSuccess(savedEmployee));
//       })
//       .catch(error => {
//         dispatch(apiCallError(error));
//         throw error;
//       });
//   };
// }
//
// export function deleteEmployee(employee) {
//   return function(dispatch) {
//     // Doing optimistic delete, so not dispatching begin/end api call
//     // actions, or apiCallError action since we're not showing the loading status for this.
//     dispatch(deleteEmployeeOptimistic(employee));
//     return courseApi.deleteEmployee(employee.id);
//   };
// }

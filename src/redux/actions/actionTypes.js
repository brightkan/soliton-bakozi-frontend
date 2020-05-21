// By convention, actions that end in "_SUCCESS" are assumed to have been the result of a completed
// API call. But since we're doing an optimistic delete, we're hiding loading state.
// So this action name deliberately omits the "_SUCCESS" suffix.
// If it had one, our apiCallsInProgress counter would be decremented below zero
// because we're not incrementing the number of apiCallInProgress when the delete request begins.

export const BEGIN_API_CALL = 'BEGIN_API_CALL';
export const API_CALL_ERROR = 'API_CALL_ERROR';

// Employees
export const LOAD_EMPLOYEES_SUCCESS = 'LOAD_EMPLOYEES_SUCCESS';
export const CREATE_EMPLOYEE_SUCCESS = 'CREATE_EMPLOYEE_SUCCESS';
export const UPDATE_EMPLOYEE_SUCCESS = 'UPDATE_EMPLOYEE_SUCCESS';
export const DELETE_EMPLOYEE_OPTIMISTIC = 'DELETE_EMPLOYEE_OPTIMISTIC';

// Currencies
export const LOAD_CURRENCIES_SUCCESS = 'LOAD_CURRENCIES_SUCCESS';
export const CREATE_CURRENCY_SUCCESS = 'CREATE_CURRENCY_SUCCESS';
export const UPDATE_CURRENCY_SUCCESS = 'UPDATE_CURRENCY_SUCCESS';
export const DELETE_CURRENCY_OPTIMISTIC = 'DELETE_CURRENCY_OPTIMISTIC';

// Holidays
export const LOAD_HOLIDAYS_SUCCESS = 'LOAD_HOLIDAYS_SUCCESS';
export const CREATE_HOLIDAY_SUCCESS = 'CREATE_HOLIDAY_SUCCESS';
export const UPDATE_HOLIDAY_SUCCESS = 'UPDATE_HOLIDAY_SUCCESS';
export const DELETE_HOLIDAY_OPTIMISTIC = 'DELETE_HOLIDAY_OPTIMISTIC';

// Users
export const LOAD_USERS_SUCCESS = 'LOAD_USERS_SUCCESS';
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const DELETE_USER_OPTIMISTIC = 'DELETE_USER_OPTIMISTIC';

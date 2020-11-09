import * as types from './actionTypes';


export function setCurrentEmployee(currentEmployee){
  return{type: types.SET_CURRENT_EMPLOYEE, currentEmployee}
}

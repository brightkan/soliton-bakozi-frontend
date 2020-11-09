import * as types from './actionTypes';



export function setCurrentUser(currentUser){
  return{type: types.SET_CURRENT_USER, currentUser}
}
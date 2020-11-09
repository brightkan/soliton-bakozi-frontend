import * as types from './actionTypes';
import { beginApiCall, apiCallError } from './apiStatusActions';
import { getAllSolitonUsers } from '../../services/solitonUserService';

export function loadSolitonUserSuccess(solitonUsers) {
  return { type: types.LOAD_SOLITON_USERS_SUCCESS, solitonUsers };
}

export function createUserSuccess(user) {
  return { type: types.CREATE_USER_SUCCESS, user };
}

export function updateUserSuccess(user) {
  return { type: types.UPDATE_USER_SUCCESS, user };
}

export function deleteUserOptimistic(user) {
  return { type: types.DELETE_USER_OPTIMISTIC, user };
}

export function loadSolitonUsers() {
  return function(dispatch) {
    dispatch(beginApiCall());
    return getAllSolitonUsers().then(res=>res.data)
      .then(solitonUsers => {
        dispatch(loadSolitonUserSuccess(solitonUsers));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

// export function saveUser(user) {
//   //eslint-disable-next-line no-unused-vars
//   return function(dispatch, getState) {
//     dispatch(beginApiCall());
//     return courseApi
//       .saveUser(user)
//       .then(savedUser => {
//         user.id
//           ? dispatch(updateUserSuccess(savedUser))
//           : dispatch(createUserSuccess(savedUser));
//       })
//       .catch(error => {
//         dispatch(apiCallError(error));
//         throw error;
//       });
//   };
// }

// export function deleteUser(user) {
//   return function(dispatch) {
//     // Doing optimistic delete, so not dispatching begin/end api call
//     // actions, or apiCallError action since we're not showing the loading status for this.
//     dispatch(deleteUserOptimistic(user));
//     return courseApi.deleteUser(user.id);
//   };
// }

import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function solitonUserReducer(state = initialState.users, action) {
  switch (action.type) {
    case types.CREATE_USER_SUCCESS:
      return [...state, { ...action.user }];
    case types.UPDATE_USER_SUCCESS:
      return state.map(user =>
        user.id === action.user.id ? action.user : user,
      );
    case types.LOAD_SOLITON_USERS_SUCCESS:
      console.log("soliton user reducer works")
      return action.solitonUsers;
    case types.DELETE_USER_OPTIMISTIC:
      return state.filter(user => user.id !== action.user.id);
    default:
      return state;
  }
}

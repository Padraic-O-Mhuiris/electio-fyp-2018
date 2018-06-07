import initialState from './initialState';
import * as types from '../constants/actionTypes';

const getUserElections = (state, action) => {
  return action.user_elections
}

export default function (user_elections = initialState.user_elections, action) {
    switch (action.type) {
      case types.ADD_USER_ELECTIONS :
        return getUserElections(user_elections, action)
      default:
        return user_elections;
    }
  }
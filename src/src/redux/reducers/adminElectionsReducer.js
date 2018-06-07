import initialState from './initialState';
import * as types from '../constants/actionTypes';

const getAdminElections = (state, action) => {
  return action.admin_elections
}

export default function (admin_elections = initialState.admin_elections, action) {
    switch (action.type) {
      case types.ADD_ADMIN_ELECTIONS :
        return getAdminElections(admin_elections, action)
      default:
        return admin_elections;
    }
  }
import * as types from '../constants/actionTypes';

// Adds Array of data to elections object
export const userElectionsAction = (user_elections) => ({
  type: types.ADD_USER_ELECTIONS,
  user_elections
});



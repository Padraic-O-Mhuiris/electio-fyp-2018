import * as types from '../constants/actionTypes';

// Adds Array of data to elections object
export const adminElectionsAction = (admin_elections) => ({
  type: types.ADD_ADMIN_ELECTIONS,
  admin_elections
});



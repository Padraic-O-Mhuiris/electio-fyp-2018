import * as types from '../constants/actionTypes';

// Adds Array of data to elections object
export const candidateElectionsAction = (candidate_elections) => ({
  type: types.ADD_CANDIDATE_ELECTIONS,
  candidate_elections
});



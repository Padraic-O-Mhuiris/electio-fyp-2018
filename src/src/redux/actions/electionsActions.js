import * as types from '../constants/actionTypes';

// Adds Array of data to elections object
export const electionsAction = (elections) => ({
  type: types.ADD_ELECTIONS,
  elections
});

export const electionsInsertAction = (new_election) => ({
  type: types.INSERT_ELECTION,
  new_election
});

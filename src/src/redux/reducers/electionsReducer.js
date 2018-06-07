import initialState from './initialState';
import * as types from '../constants/actionTypes';

const getElections = (state, action) => {
  return action.elections
}

export default function (elections = initialState.elections, action) {
    switch (action.type) {
      case types.ADD_ELECTIONS :
        return getElections(elections, action)
      case types.INSERT_ELECTION :
        return {
          ...elections,
          elections: [...elections, action.new_election]
        }
      default:
        return elections;
    }
  }
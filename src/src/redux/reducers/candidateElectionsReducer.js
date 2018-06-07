import initialState from './initialState';
import * as types from '../constants/actionTypes';

const getCandidateElections = (state, action) => {
  return action.candidate_elections
}

export default function (candidate_elections = initialState.candidate_elections, action) {
    switch (action.type) {
      case types.ADD_CANDIDATE_ELECTIONS :
        return getCandidateElections(candidate_elections, action)
      default:
        return candidate_elections;
    }
  }
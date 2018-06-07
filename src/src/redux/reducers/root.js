import { combineReducers } from 'redux'
import metaMask from './metaMaskReducer'
import elections from './electionsReducer'
import user_elections from './userElectionsReducer'
import admin_elections from './adminElectionsReducer'
import candidate_elections from './candidateElectionsReducer'
import election from './currentElectionReducer'

const appReducer = combineReducers({
    metaMask,
    elections,
    user_elections,
    admin_elections,
    candidate_elections,
    election
});

const rootReducer = (state, action) => {
    return appReducer(state, action);
}
  
export default rootReducer;
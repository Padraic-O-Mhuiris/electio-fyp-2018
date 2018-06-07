import { connect } from 'react-redux';
import App from './App';

import {
  metaMaskAccountAction,
  metaMaskNetworkAction
} from './redux/actions/metaMaskActions';

import {
  electionsAction,
  electionsInsertAction
} from './redux/actions/electionsActions'

import {
  userElectionsAction
} from './redux/actions/userElectionsActions'

import {
  adminElectionsAction
} from './redux/actions/adminElectionsActions'

import {
  candidateElectionsAction
} from './redux/actions/candidateElectionsActions'

import {
  electionAction,
  electionVotingAddressAction,
  electionRegistrationAddressAction,
  electionAdminAction,
  electionNameAction,
  electionRegBeginAction,
  electionRegEndAction,
  electionVoteBeginAction,
  electionVoteEndAction,
  statusVoterAppliedAction,
  statusVoterCheckedAction,
  statusVoterValidAction,
  statusVoterVotedAction,
  statusVoterTimeAppliedAction,
  statusVoterTimeCheckedAction,
  statusVoterNominatedAction,
  statusVoterCodeAction,
  statusCandidateAppliedAction,
  statusCandidateValidAction,
  statusCandidateTimeAppliedActiion,
  statusCandidateTimeNominatedAction,
  electionPublicKeyAction,
  electionPrivateKeyAction,
  electionCandidatesAction,
  electionVotesAction,
  electionStageAction,
  electionTypeAction
} from './redux/actions/currentElectionActions'

const mapStateToProps = (state) => ({
  metaMask: state.metaMask,
  elections: state.elections,
  user_elections: state.user_elections,
  admin_elections: state.admin_elections,
  candidate_elections: state.candidate_elections,
  election: state.election
});

const mapDispatchToProps = (dispatch) => {
  return {
    handleMetaMaskAccount: (account) => {
      dispatch(metaMaskAccountAction(account));
    },
    handleMetaMaskNetwork: (network) => {
      dispatch(metaMaskNetworkAction(network));
    },
    handleElections: (elections) => {
      dispatch(electionsAction(elections))
    },
    handleInsertElection: (new_election) => {
      dispatch(electionsInsertAction(new_election))
    },
    handleUserElections: (user_elections) => {
      dispatch(userElectionsAction(user_elections))
    },
    handleAdminElections: (admin_elections) => {
      dispatch(adminElectionsAction(admin_elections))
    },
    handleCandidateElections: (candidate_elections) => {
      dispatch(candidateElectionsAction(candidate_elections))
    },
    handleCurrentElection: (election) => {
      dispatch(electionAction(election))
    },
    handleElectionVotingAddress: (voting_address) => {
      dispatch(electionVotingAddressAction(voting_address))
    },
    handleElectionRegistrationAddress: (registration_address) => {
      dispatch(electionRegistrationAddressAction(registration_address))
    },
    handleElectionAdmin: (admin) => {
      dispatch(electionAdminAction(admin))
    },
    handleElectionName: (name) => {
      dispatch(electionNameAction(name))
    },
    handleElectionRegBegin: (r_begin) => {
      dispatch(electionRegBeginAction(r_begin))
    },
    handleElectionRegEnd: (r_end) => {
      dispatch(electionRegEndAction(r_end))
    },
    handleElectionVoteBegin: (v_begin) => {
      dispatch(electionVoteBeginAction(v_begin))
    },
    handleElectionVoteEnd: (v_end) => {
      dispatch(electionVoteEndAction(v_end))
    },
    handleSVApplied: (applied) => {
      dispatch(statusVoterAppliedAction(applied))
    },
    handleSVChecked: (checked) => {
      dispatch(statusVoterCheckedAction(checked))
    },
    handleSVValid: (valid) => {
      dispatch(statusVoterValidAction(valid))
    },
    handleSVVoted: (voted) => {
      dispatch(statusVoterVotedAction(voted))
    },
    handleSVTimeApplied: (time_applied) => {
      dispatch(statusVoterTimeAppliedAction(time_applied))
    },
    handleSVTimeChecked: (time_checked) => {
      dispatch(statusVoterTimeCheckedAction(time_checked))
    },
    handleSVNominated: (nominee) => {
      dispatch(statusVoterNominatedAction(nominee))
    },
    handleSVidCode: (id_code) => {
      dispatch(statusVoterCodeAction(id_code))
    },
    handleSCApplied: (applied) => {
      dispatch(statusCandidateAppliedAction(applied))
    },
    handleSCValid: (valid) => {
      dispatch(statusCandidateValidAction(valid))
    },
    handleSCTimeApplied: (time_applied) => {
      dispatch(statusCandidateTimeAppliedActiion(time_applied))
    },
    handleSCTimesNominated: (time_nominated) => {
      dispatch(statusCandidateTimeNominatedAction(time_nominated))
    },
    handlePBK: (public_key) => {
      dispatch(electionPublicKeyAction(public_key))
    },
    handlePVK: (private_key) => {
      dispatch(electionPrivateKeyAction(private_key))
    },
    handleElectionCandidates: (candidates) => {
      dispatch(electionCandidatesAction(candidates))
    },
    handleElectionVotes: (ballots) => {
      dispatch(electionVotesAction(ballots))
    },
    handleElectionStage: (stage) => {
      dispatch(electionStageAction(stage))
    },
    handleElectionType: (election_type) => {
      dispatch(electionTypeAction(election_type))
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
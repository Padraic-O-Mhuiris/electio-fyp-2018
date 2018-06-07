import * as types from '../constants/actionTypes';

// Adds Array of data to elections object
export const electionAction = (election) => ({
  type: types.UPDATE_CURRENT_ELECTION,
  election
});

export const electionVotingAddressAction = (voting_address) => ({
  type: types.ELECTION_VOTING_ADDRESS,
  voting_address
})

export const electionRegistrationAddressAction = (registration_address) => ({
  type: types.ELECTION_REGISTRATION_ADDRESS,
  registration_address
})

export const electionAdminAction = (admin) => ({
  type: types.ELECTION_ADMIN_ADDRESS,
  admin
})

export const electionNameAction = (name) => ({
  type: types.ELECTION_NAME,
  name
})

export const electionRegBeginAction = (r_begin) => ({
  type: types.ELECTION_R_BEGIN,
  r_begin
})

export const electionRegEndAction = (r_end) => ({
  type: types.ELECTION_R_END,
  r_end
})

export const electionVoteBeginAction= (v_begin) => ({
  type: types.ELECTION_V_BEGIN,
  v_begin
})

export const electionVoteEndAction = (v_end) => ({
  type: types.ELECTION_V_END,
  v_end
})

export const statusVoterAppliedAction = (applied) => ({
  type: types.STATUS_VOTER_APPLIED,
  applied
})

export const statusVoterCheckedAction = (checked) => ({
  type: types.STATUS_VOTER_CHECKED,
  checked
})

export const statusVoterValidAction = (valid) => ({
  type: types.STATUS_VOTER_VALID,
  valid
})

export const statusVoterVotedAction = (voted) => ({
  type: types.STATUS_VOTER_VOTED,
  voted
})

export const statusVoterTimeAppliedAction = (time_applied) => ({
  type: types.STATUS_VOTER_TIME_APPLIED,
  time_applied
})

export const statusVoterTimeCheckedAction = (time_checked) => ({
  type: types.STATUS_VOTER_TIME_CHECKED,
  time_checked
})

export const statusVoterNominatedAction = (nominee) => ({
  type: types.STATUS_VOTER_NOMINATED,
  nominee
})

export const statusVoterCodeAction = (id_code) => ({
  type: types.STATUS_VOTER_ID_CODE,
  id_code
})

export const statusCandidateAppliedAction = (applied) => ({
  type: types.STATUS_CANDIDATE_APPLIED,
  applied
})

export const statusCandidateValidAction = (valid) => ({
  type: types.STATUS_CANDIDATE_VALID,
  valid
})

export const statusCandidateTimeAppliedActiion = (time_applied) => ({
  type: types.STATUS_CANDIDATE_TIME_APPLIED,
  time_applied
})

export const statusCandidateTimeNominatedAction = (time_nominated) => ({
  type: types.STATUS_CANDIDATE_TIME_NOMINATED,
  time_nominated
})

export const electionPublicKeyAction = (public_key) => ({
  type: types.ELECTION_PUBLIC_KEY,
  public_key
})

export const electionPrivateKeyAction = (private_key) => ({
  type: types.ELECTION_PRIVATE_KEY,
  private_key
})

export const electionCandidatesAction = (candidates) => ({
  type: types.ELECTION_CANDIDATES,
  candidates
})

export const electionVotesAction = (ballots) => ({
  type: types.ELECTION_VOTES,
  ballots
})

export const electionStageAction = (stage) => ({
  type: types.ELECTION_STAGE,
  stage
})

export const electionTypeAction = (election_type) => ({
  type: types.ELECTION_TYPE,
  election_type
})
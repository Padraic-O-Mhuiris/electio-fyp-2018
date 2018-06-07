import initialState from './initialState';
import * as types from '../constants/actionTypes';

const getCurrentElection = (state, action) => {
  return action.election
}

const get_voting_address = (state, action) => {
  return {
    voting_address: action.voting_address,
    registration_address: state.registration_address,

    admin: state.admin,
    election_type : state.election_type,
    stage: state.stage,

    name: state.name,

    r_begin: state.r_begin,
    r_end: state.r_end,

    v_begin: state.v_begin,
    v_end: state.v_end,

    candidates : state.candidates,

    status_voter: {
        applied: state.status_voter.applied,
        checked: state.status_voter.checked,
        valid: state.status_voter.valid,
        voted: state.status_voter.voted,
        time_applied: state.status_voter.time_applied,
        time_checked: state.status_voter.time_checked,
        nominated: state.status_voter.nominated,
        id_code: state.status_voter.id_code
    },

    status_candidate: {
        applied: state.status_candidate.applied,
        valid: state.status_candidate.valid,
        time_applied: state.status_candidate.time_applied,
        time_nominated: state.status_candidate.time_nominated,
    },

    public_key: state.public_key,
    private_key: state.private_key,

    ballots: state.ballots
  }
}

const get_registration_address = (state, action) => {
  return {
    voting_address: state.voting_address,
    registration_address: action.registration_address,

    admin: state.admin,
    election_type : state.election_type,
    stage: state.stage,

    name: state.name,
    
    r_begin: state.r_begin,
    r_end: state.r_end,

    v_begin: state.v_begin,
    v_end: state.v_end,

    candidates : state.candidates,

    status_voter: {
        applied: state.status_voter.applied,
        checked: state.status_voter.checked,
        valid: state.status_voter.valid,
        voted: state.status_voter.voted,
        time_applied: state.status_voter.time_applied,
        time_checked: state.status_voter.time_checked,
        nominated: state.status_voter.nominated,
        id_code: state.status_voter.id_code
    },

    status_candidate: {
        applied: state.status_candidate.applied,
        valid: state.status_candidate.valid,
        time_applied: state.status_candidate.time_applied,
        time_nominated: state.status_candidate.time_nominated,
    },

    public_key: state.public_key,
    private_key: state.private_key,

    ballots: state.ballots
  }
}

const get_admin_address = (state, action) => {
  return {
    voting_address: state.voting_address,
    registration_address: state.registration_address,

    admin: action.admin,
    election_type : state.election_type,
    stage: state.stage,

    name: state.name,

    r_begin: state.r_begin,
    r_end: state.r_end,

    v_begin: state.v_begin,
    v_end: state.v_end,

    candidates : state.candidates,

    status_voter: {
        applied: state.status_voter.applied,
        checked: state.status_voter.checked,
        valid: state.status_voter.valid,
        voted: state.status_voter.voted,
        time_applied: state.status_voter.time_applied,
        time_checked: state.status_voter.time_checked,
        nominated: state.status_voter.nominated,
        id_code: state.status_voter.id_code
    },

    status_candidate: {
        applied: state.status_candidate.applied,
        valid: state.status_candidate.valid,
        time_applied: state.status_candidate.time_applied,
        time_nominated: state.status_candidate.time_nominated,
    },

    public_key: state.public_key,
    private_key: state.private_key,

    ballots: state.ballots
  }
}

const get_name = (state, action) => {
  return {
    voting_address: state.voting_address,
    registration_address: state.registration_address,

    admin: state.admin,
    election_type : state.election_type,
    stage: state.stage,

    name: action.name,

    r_begin: state.r_begin,
    r_end: state.r_end,

    v_begin: state.v_begin,
    v_end: state.v_end,

    candidates : state.candidates,

    status_voter: {
        applied: state.status_voter.applied,
        checked: state.status_voter.checked,
        valid: state.status_voter.valid,
        voted: state.status_voter.voted,
        time_applied: state.status_voter.time_applied,
        time_checked: state.status_voter.time_checked,
        nominated: state.status_voter.nominated,
        id_code: state.status_voter.id_code
    },

    status_candidate: {
        applied: state.status_candidate.applied,
        valid: state.status_candidate.valid,
        time_applied: state.status_candidate.time_applied,
        time_nominated: state.status_candidate.time_nominated,
    },

    public_key: state.public_key,
    private_key: state.private_key,

    ballots: state.ballots
  }
}

const get_r_begin = (state, action) => {
  return {
    voting_address: state.voting_address,
    registration_address: state.registration_address,

    admin: state.admin,
    election_type : state.election_type,
    stage: state.stage,

    name: state.name,

    r_begin: action.r_begin,
    r_end: state.r_end,

    v_begin: state.v_begin,
    v_end: state.v_end,

    candidates : state.candidates,

    status_voter: {
        applied: state.status_voter.applied,
        checked: state.status_voter.checked,
        valid: state.status_voter.valid,
        voted: state.status_voter.voted,
        time_applied: state.status_voter.time_applied,
        time_checked: state.status_voter.time_checked,
        nominated: state.status_voter.nominated,
        id_code: state.status_voter.id_code
    },

    status_candidate: {
        applied: state.status_candidate.applied,
        valid: state.status_candidate.valid,
        time_applied: state.status_candidate.time_applied,
        time_nominated: state.status_candidate.time_nominated,
    },

    public_key: state.public_key,
    private_key: state.private_key,

    ballots: state.ballots
  }
}

const get_r_end = (state, action) => {
  return {
    voting_address: state.voting_address,
    registration_address: state.registration_address,

    admin: state.admin,
    election_type : state.election_type,
    stage: state.stage,

    name: state.name,

    r_begin: state.r_begin,
    r_end: action.r_end,

    v_begin: state.v_begin,
    v_end: state.v_end,

    candidates : state.candidates,

    status_voter: {
        applied: state.status_voter.applied,
        checked: state.status_voter.checked,
        valid: state.status_voter.valid,
        voted: state.status_voter.voted,
        time_applied: state.status_voter.time_applied,
        time_checked: state.status_voter.time_checked,
        nominated: state.status_voter.nominated,
        id_code: state.status_voter.id_code
    },

    status_candidate: {
        applied: state.status_candidate.applied,
        valid: state.status_candidate.valid,
        time_applied: state.status_candidate.time_applied,
        time_nominated: state.status_candidate.time_nominated,
    },

    public_key: state.public_key,
    private_key: state.private_key,

    ballots: state.ballots
  }
}

const get_v_begin = (state, action) => {
  return {
    voting_address: state.voting_address,
    registration_address: state.registration_address,

    admin: state.admin,
    election_type : state.election_type,
    stage: state.stage,

    name: state.name,

    r_begin: state.r_begin,
    r_end: state.r_end,

    v_begin: action.v_begin,
    v_end: state.v_end,

    candidates : state.candidates,

    status_voter: {
        applied: state.status_voter.applied,
        checked: state.status_voter.checked,
        valid: state.status_voter.valid,
        voted: state.status_voter.voted,
        time_applied: state.status_voter.time_applied,
        time_checked: state.status_voter.time_checked,
        nominated: state.status_voter.nominated,
        id_code: state.status_voter.id_code
    },

    status_candidate: {
        applied: state.status_candidate.applied,
        valid: state.status_candidate.valid,
        time_applied: state.status_candidate.time_applied,
        time_nominated: state.status_candidate.time_nominated,
    },

    public_key: state.public_key,
    private_key: state.private_key,

    ballots: state.ballots
  }
}

const get_v_end = (state, action) => {
  return {
    voting_address: state.voting_address,
    registration_address: state.registration_address,

    admin: state.admin,
    election_type : state.election_type,
    stage: state.stage,

    name: state.name,

    r_begin: state.r_begin,
    r_end: state.r_end,

    v_begin: state.v_begin,
    v_end: action.v_end,

    candidates : state.candidates,

    status_voter: {
        applied: state.status_voter.applied,
        checked: state.status_voter.checked,
        valid: state.status_voter.valid,
        voted: state.status_voter.voted,
        time_applied: state.status_voter.time_applied,
        time_checked: state.status_voter.time_checked,
        nominated: state.status_voter.nominated,
        id_code: state.status_voter.id_code
    },

    status_candidate: {
        applied: state.status_candidate.applied,
        valid: state.status_candidate.valid,
        time_applied: state.status_candidate.time_applied,
        time_nominated: state.status_candidate.time_nominated,
    },

    public_key: state.public_key,
    private_key: state.private_key,

    ballots: state.ballots
  }
}

const get_status_voter_applied = (state, action) => {
  return {
    voting_address: state.voting_address,
    registration_address: state.registration_address,

    admin: state.admin,
    election_type : state.election_type,
    stage: state.stage,

    name: state.name,

    r_begin: state.r_begin,
    r_end: state.r_end,

    v_begin: state.v_begin,
    v_end: state.v_end,

    candidates : state.candidates,

    status_voter: {
        applied: action.applied,
        checked: state.status_voter.checked,
        valid: state.status_voter.valid,
        voted: state.status_voter.voted,
        time_applied: state.status_voter.time_applied,
        time_checked: state.status_voter.time_checked,
        nominated: state.status_voter.nominated,
        id_code: state.status_voter.id_code
    },

    status_candidate: {
        applied: state.status_candidate.applied,
        valid: state.status_candidate.valid,
        time_applied: state.status_candidate.time_applied,
        time_nominated: state.status_candidate.time_nominated,
    },

    public_key: state.public_key,
    private_key: state.private_key,

    ballots: state.ballots
  }
}

const get_status_voter_checked = (state, action) => {
  return {
    voting_address: state.voting_address,
    registration_address: state.registration_address,

    admin: state.admin,
    election_type : state.election_type,
    stage: state.stage,

    name: state.name,

    r_begin: state.r_begin,
    r_end: state.r_end,

    v_begin: state.v_begin,
    v_end: state.v_end,

    candidates : state.candidates,

    status_voter: {
        applied: state.status_voter.applied,
        checked: action.checked,
        valid: state.status_voter.valid,
        voted: state.status_voter.voted,
        time_applied: state.status_voter.time_applied,
        time_checked: state.status_voter.time_checked,
        nominated: state.status_voter.nominated,
        id_code: state.status_voter.id_code
    },

    status_candidate: {
        applied: state.status_candidate.applied,
        valid: state.status_candidate.valid,
        time_applied: state.status_candidate.time_applied,
        time_nominated: state.status_candidate.time_nominated,
    },

    public_key: state.public_key,
    private_key: state.private_key,

    ballots: state.ballots
  }
}

const get_status_voter_valid = (state, action) => {
  return {
    voting_address: state.voting_address,
    registration_address: state.registration_address,

    admin: state.admin,
    election_type : state.election_type,
    stage: state.stage,

    name: state.name,

    r_begin: state.r_begin,
    r_end: state.r_end,

    v_begin: state.v_begin,
    v_end: state.v_end,

    candidates : state.candidates,

    status_voter: {
        applied: state.status_voter.applied,
        checked: state.status_voter.checked,
        valid: action.valid,
        voted: state.status_voter.voted,
        time_applied: state.status_voter.time_applied,
        time_checked: state.status_voter.time_checked,
        nominated: state.status_voter.nominated,
        id_code: state.status_voter.id_code
    },

    status_candidate: {
        applied: state.status_candidate.applied,
        valid: state.status_candidate.valid,
        time_applied: state.status_candidate.time_applied,
        time_nominated: state.status_candidate.time_nominated,
    },

    public_key: state.public_key,
    private_key: state.private_key,

    ballots: state.ballots
  }
}

const get_status_voter_voted = (state, action) => {
  return {
    voting_address: state.voting_address,
    registration_address: state.registration_address,

    admin: state.admin,
    election_type : state.election_type,
    stage: state.stage,

    name: state.name,

    r_begin: state.r_begin,
    r_end: state.r_end,

    v_begin: state.v_begin,
    v_end: state.v_end,

    candidates : state.candidates,

    status_voter: {
        applied: state.status_voter.applied,
        checked: state.status_voter.checked,
        valid: state.status_voter.valid,
        voted: action.voted,
        time_applied: state.status_voter.time_applied,
        time_checked: state.status_voter.time_checked,
        nominated: state.status_voter.nominated,
        id_code: state.status_voter.id_code
    },

    status_candidate: {
        applied: state.status_candidate.applied,
        valid: state.status_candidate.valid,
        time_applied: state.status_candidate.time_applied,
        time_nominated: state.status_candidate.time_nominated,
    },

    public_key: state.public_key,
    private_key: state.private_key,

    ballots: state.ballots
  }
}

const get_status_voter_time_applied = (state, action) => {
  return {
    voting_address: state.voting_address,
    registration_address: state.registration_address,

    admin: state.admin,
    election_type : state.election_type,
    stage: state.stage,

    name: state.name,

    r_begin: state.r_begin,
    r_end: state.r_end,

    v_begin: state.v_begin,
    v_end: state.v_end,

    candidates : state.candidates,

    status_voter: {
        applied: state.status_voter.applied,
        checked: state.status_voter.checked,
        valid: state.status_voter.valid,
        voted: state.status_voter.voted,
        time_applied: action.time_applied,
        time_checked: state.status_voter.time_checked,
        nominated: state.status_voter.nominated,
        id_code: state.status_voter.id_code
    },

    status_candidate: {
        applied: state.status_candidate.applied,
        valid: state.status_candidate.valid,
        time_applied: state.status_candidate.time_applied,
        time_nominated: state.status_candidate.time_nominated,
    },

    public_key: state.public_key,
    private_key: state.private_key,

    ballots: state.ballots
  }
}

const get_status_voter_time_checked = (state, action) => {
  return {
    voting_address: state.voting_address,
    registration_address: state.registration_address,

    admin: state.admin,
    election_type : state.election_type,
    stage: state.stage,

    name: state.name,

    r_begin: state.r_begin,
    r_end: state.r_end,

    v_begin: state.v_begin,
    v_end: state.v_end,

    candidates : state.candidates,

    status_voter: {
        applied: state.status_voter.applied,
        checked: state.status_voter.checked,
        valid: state.status_voter.valid,
        voted: state.status_voter.voted,
        time_applied: state.status_voter.time_applied,
        time_checked: action.time_checked,
        nominated: state.status_voter.nominated,
        id_code: state.status_voter.id_code
    },

    status_candidate: {
        applied: state.status_candidate.applied,
        valid: state.status_candidate.valid,
        time_applied: state.status_candidate.time_applied,
        time_nominated: state.status_candidate.time_nominated,
    },

    public_key: state.public_key,
    private_key: state.private_key,

    ballots: state.ballots
  }
}

const get_status_voter_nominated = (state, action) => {
  return {
    voting_address: state.voting_address,
    registration_address: state.registration_address,

    admin: state.admin,
    election_type : state.election_type,
    stage: state.stage,

    name: state.name,

    r_begin: state.r_begin,
    r_end: state.r_end,

    v_begin: state.v_begin,
    v_end: state.v_end,

    candidates : state.candidates,

    status_voter: {
        applied: state.status_voter.applied,
        checked: state.status_voter.checked,
        valid: state.status_voter.valid,
        voted: state.status_voter.voted,
        time_applied: state.status_voter.time_applied,
        time_checked: state.status_voter.time_checked,
        nominated: action.nominee,
        id_code: state.status_voter.id_code
    },

    status_candidate: {
        applied: state.status_candidate.applied,
        valid: state.status_candidate.valid,
        time_applied: state.status_candidate.time_applied,
        time_nominated: state.status_candidate.time_nominated,
    },

    public_key: state.public_key,
    private_key: state.private_key,

    ballots: state.ballots
  }
}

const get_status_voter_code = (state, action) => {
  return {
    voting_address: state.voting_address,
    registration_address: state.registration_address,

    admin: state.admin,
    election_type : state.election_type,
    stage: state.stage,

    name: state.name,

    r_begin: state.r_begin,
    r_end: state.r_end,

    v_begin: state.v_begin,
    v_end: state.v_end,

    candidates : state.candidates,

    status_voter: {
        applied: state.status_voter.applied,
        checked: state.status_voter.checked,
        valid: state.status_voter.valid,
        voted: state.status_voter.voted,
        time_applied: state.status_voter.time_applied,
        time_checked: state.status_voter.time_checked,
        nominated: state.status_voter.nominated,
        id_code: action.id_code
    },

    status_candidate: {
        applied: state.status_candidate.applied,
        valid: state.status_candidate.valid,
        time_applied: state.status_candidate.time_applied,
        time_nominated: state.status_candidate.time_nominated,
    },

    public_key: state.public_key,
    private_key: state.private_key,

    ballots: state.ballots
  }
}

const get_status_candidate_applied = (state, action) => {
  return {
    voting_address: state.voting_address,
    registration_address: state.registration_address,

    admin: state.admin,
    election_type : state.election_type,
    stage: state.stage,

    name: state.name,

    r_begin: state.r_begin,
    r_end: state.r_end,

    v_begin: state.v_begin,
    v_end: state.v_end,

    candidates : state.candidates,

    status_voter: {
        applied: state.status_voter.applied,
        checked: state.status_voter.checked,
        valid: state.status_voter.valid,
        voted: state.status_voter.voted,
        time_applied: state.status_voter.time_applied,
        time_checked: state.status_voter.time_checked,
        nominated: state.status_voter.nominated,
        id_code: state.status_voter.id_code
    },

    status_candidate: {
        applied: action.applied,
        valid: state.status_candidate.valid,
        time_applied: state.status_candidate.time_applied,
        time_nominated: state.status_candidate.time_nominated,
    },

    public_key: state.public_key,
    private_key: state.private_key,

    ballots: state.ballots
  }
}

const get_status_candidate_valid = (state, action) => {
  return {
    voting_address: state.voting_address,
    registration_address: state.registration_address,

    admin: state.admin,
    
    stage: state.stage,
    election_type : state.election_type,
    name: state.name,

    r_begin: state.r_begin,
    r_end: state.r_end,

    v_begin: state.v_begin,
    v_end: state.v_end,

    candidates : state.candidates,

    status_voter: {
        applied: state.status_voter.applied,
        checked: state.status_voter.checked,
        valid: state.status_voter.valid,
        voted: state.status_voter.voted,
        time_applied: state.status_voter.time_applied,
        time_checked: state.status_voter.time_checked,
        nominated: state.status_voter.nominated,
        id_code: state.status_voter.id_code
    },

    status_candidate: {
        applied: state.status_candidate.applied,
        valid: action.valid,
        time_applied: state.status_candidate.time_applied,
        time_nominated: state.status_candidate.time_nominated,
    },

    public_key: state.public_key,
    private_key: state.private_key,

    ballots: state.ballots
  }
}

const get_status_candidate_time_applied = (state, action) => {
  return {
    voting_address: state.voting_address,
    registration_address: state.registration_address,

    admin: state.admin,
    
    stage: state.stage,
    election_type : state.election_type,
    name: state.name,

    r_begin: state.r_begin,
    r_end: state.r_end,

    v_begin: state.v_begin,
    v_end: state.v_end,

    candidates : state.candidates,

    status_voter: {
        applied: state.status_voter.applied,
        checked: state.status_voter.checked,
        valid: state.status_voter.valid,
        voted: state.status_voter.voted,
        time_applied: state.status_voter.time_applied,
        time_checked: state.status_voter.time_checked,
        nominated: state.status_voter.nominated,
        id_code: state.status_voter.id_code
    },

    status_candidate: {
        applied: state.status_candidate.applied,
        valid: state.status_candidate.valid,
        time_applied: action.time_applied,
        time_nominated: state.status_candidate.time_nominated,
    },

    public_key: state.public_key,
    private_key: state.private_key,

    ballots: state.ballots
  }
}

const get_status_candidate_time_nominated = (state, action) => {
  return {
    voting_address: state.voting_address,
    registration_address: state.registration_address,

    admin: state.admin,
    election_type : state.election_type,
    stage: state.stage,

    name: state.name,

    r_begin: state.r_begin,
    r_end: state.r_end,

    v_begin: state.v_begin,
    v_end: state.v_end,

    candidates : state.candidates,

    status_voter: {
        applied: state.status_voter.applied,
        checked: state.status_voter.checked,
        valid: state.status_voter.valid,
        voted: state.status_voter.voted,
        time_applied: state.status_voter.time_applied,
        time_checked: state.status_voter.time_checked,
        nominated: state.status_voter.nominated,
        id_code: state.status_voter.id_code
    },

    status_candidate: {
        applied: state.status_candidate.applied,
        valid: state.status_candidate.valid,
        time_applied: state.status_candidate.time_applied,
        time_nominated: action.time_nominated,
    },

    public_key: state.public_key,
    private_key: state.private_key,

    ballots: state.ballots
  }
}

const get_election_pbk = (state, action) => {
  return {
    voting_address: state.voting_address,
    registration_address: state.registration_address,

    admin: state.admin,
    election_type : state.election_type,
    stage: state.stage,

    name: state.name,

    r_begin: state.r_begin,
    r_end: state.r_end,

    v_begin: state.v_begin,
    v_end: state.v_end,

    candidates : state.candidates,

    status_voter: {
        applied: state.status_voter.applied,
        checked: state.status_voter.checked,
        valid: state.status_voter.valid,
        voted: state.status_voter.voted,
        time_applied: state.status_voter.time_applied,
        time_checked: state.status_voter.time_checked,
        nominated: state.status_voter.nominated,
        id_code: state.status_voter.id_code
    },

    status_candidate: {
        applied: state.status_candidate.applied,
        valid: state.status_candidate.valid,
        time_applied: state.status_candidate.time_applied,
        time_nominated: state.status_voter.time_nominated,
    },

    public_key: action.public_key,
    private_key: state.private_key,

    ballots: state.ballots
  }
}

const get_election_pvk = (state, action) => {
  return {
    voting_address: state.voting_address,
    registration_address: state.registration_address,

    admin: state.admin,
    election_type : state.election_type,
    stage: state.stage,

    name: state.name,

    r_begin: state.r_begin,
    r_end: state.r_end,

    v_begin: state.v_begin,
    v_end: state.v_end,

    candidates : state.candidates,

    status_voter: {
        applied: state.status_voter.applied,
        checked: state.status_voter.checked,
        valid: state.status_voter.valid,
        voted: state.status_voter.voted,
        time_applied: state.status_voter.time_applied,
        time_checked: state.status_voter.time_checked,
        nominated: state.status_voter.nominated,
        id_code: state.status_voter.id_code
    },

    status_candidate: {
        applied: state.status_candidate.applied,
        valid: state.status_candidate.valid,
        time_applied: state.status_candidate.time_applied,
        time_nominated: state.status_voter.time_nominated,
    },

    public_key: state.public_key,
    private_key: action.private_key,

    ballots: state.ballots
  }
}

const get_election_candidates = (state, action) => {
  return {
    voting_address: state.voting_address,
    registration_address: state.registration_address,

    admin: state.admin,
    election_type : state.election_type,
    stage: state.stage,

    name: state.name,

    r_begin: state.r_begin,
    r_end: state.r_end,

    v_begin: state.v_begin,
    v_end: state.v_end,

    candidates : action.candidates,

    status_voter: {
        applied: state.status_voter.applied,
        checked: state.status_voter.checked,
        valid: state.status_voter.valid,
        voted: state.status_voter.voted,
        time_applied: state.status_voter.time_applied,
        time_checked: state.status_voter.time_checked,
        nominated: state.status_voter.nominated,
        id_code: state.status_voter.id_code
    },

    status_candidate: {
        applied: state.status_candidate.applied,
        valid: state.status_candidate.valid,
        time_applied: state.status_candidate.time_applied,
        time_nominated: state.status_voter.time_nominated,
    },

    public_key: state.public_key,
    private_key: state.private_key,

    ballots: state.ballots
  }
}

const get_election_votes = (state, action) => {
  return {
    voting_address: state.voting_address,
    registration_address: state.registration_address,

    admin: state.admin,
    election_type : state.election_type,
    stage: state.stage,

    name: state.name,

    r_begin: state.r_begin,
    r_end: state.r_end,

    v_begin: state.v_begin,
    v_end: state.v_end,

    candidates : state.candidates,

    status_voter: {
        applied: state.status_voter.applied,
        checked: state.status_voter.checked,
        valid: state.status_voter.valid,
        voted: state.status_voter.voted,
        time_applied: state.status_voter.time_applied,
        time_checked: state.status_voter.time_checked,
        nominated: state.status_voter.nominated,
        id_code: state.status_voter.id_code
    },

    status_candidate: {
        applied: state.status_candidate.applied,
        valid: state.status_candidate.valid,
        time_applied: state.status_candidate.time_applied,
        time_nominated: state.status_voter.time_nominated,
    },

    public_key: state.public_key,
    private_key: state.private_key,

    ballots: action.ballots
  }
}

const get_election_stage = (state, action) => {
  return {
    voting_address: state.voting_address,
    registration_address: state.registration_address,

    admin: state.admin,
    election_type : state.election_type,
    stage: action.stage,
    
    name: state.name,

    r_begin: state.r_begin,
    r_end: state.r_end,

    v_begin: state.v_begin,
    v_end: state.v_end,

    candidates : state.candidates,

    status_voter: {
        applied: state.status_voter.applied,
        checked: state.status_voter.checked,
        valid: state.status_voter.valid,
        voted: state.status_voter.voted,
        time_applied: state.status_voter.time_applied,
        time_checked: state.status_voter.time_checked,
        nominated: state.status_voter.nominated,
        id_code: state.status_voter.id_code
    },

    status_candidate: {
        applied: state.status_candidate.applied,
        valid: state.status_candidate.valid,
        time_applied: state.status_candidate.time_applied,
        time_nominated: state.status_voter.time_nominated,
    },

    public_key: state.public_key,
    private_key: state.private_key,

    ballots: state.ballots
  }
}

const get_election_type = (state, action) => {
  return {
    voting_address: state.voting_address,
    registration_address: state.registration_address,

    admin: state.admin,
    
    stage: state.stage,
    election_type: action.election_type,
    name: state.name,

    r_begin: state.r_begin,
    r_end: state.r_end,

    v_begin: state.v_begin,
    v_end: state.v_end,

    candidates : state.candidates,

    status_voter: {
        applied: state.status_voter.applied,
        checked: state.status_voter.checked,
        valid: state.status_voter.valid,
        voted: state.status_voter.voted,
        time_applied: state.status_voter.time_applied,
        time_checked: state.status_voter.time_checked,
        nominated: state.status_voter.nominated,
        id_code: state.status_voter.id_code
    },

    status_candidate: {
        applied: state.status_candidate.applied,
        valid: state.status_candidate.valid,
        time_applied: state.status_candidate.time_applied,
        time_nominated: state.status_voter.time_nominated,
    },

    public_key: state.public_key,
    private_key: state.private_key,

    ballots: state.ballots
  }
}

export default function (election = initialState.election, action) {
    switch (action.type) {
      case types.UPDATE_CURRENT_ELECTION :
        return getCurrentElection(election, action)
      case types.ELECTION_VOTING_ADDRESS :
        return get_voting_address(election, action)
      case types.ELECTION_REGISTRATION_ADDRESS :
        return get_registration_address(election, action)
      case types.ELECTION_ADMIN_ADDRESS :
        return get_admin_address(election, action)
      case types.ELECTION_NAME :
        return get_name(election, action)
      case types.ELECTION_R_BEGIN :
        return get_r_begin(election, action)
      case types.ELECTION_R_END :
        return get_r_end(election, action)
      case types.ELECTION_V_BEGIN :
        return get_v_begin(election, action)
      case types.ELECTION_V_END :
        return get_v_end(election, action)
      case types.STATUS_VOTER_APPLIED :
        return get_status_voter_applied(election, action)
      case types.STATUS_VOTER_CHECKED :
        return get_status_voter_checked(election, action)
      case types.STATUS_VOTER_VALID :
        return get_status_voter_valid(election, action)
      case types.STATUS_VOTER_VOTED :
        return get_status_voter_voted(election, action)
      case types.STATUS_VOTER_TIME_APPLIED :
        return get_status_voter_time_applied(election, action)
        case types.STATUS_VOTER_TIME_CHECKED :
        return get_status_voter_time_checked(election, action)
      case types.STATUS_VOTER_NOMINATED :
        return get_status_voter_nominated(election, action)
      case types.STATUS_VOTER_ID_CODE :
        return get_status_voter_code(election, action)
      case types.STATUS_CANDIDATE_APPLIED : 
        return get_status_candidate_applied(election, action)
      case types.STATUS_CANDIDATE_VALID :
        return get_status_candidate_valid(election, action)
      case types.STATUS_CANDIDATE_TIME_APPLIED :
        return get_status_candidate_time_applied(election, action)
      case types.STATUS_CANDIDATE_TIME_NOMINATED : 
        return get_status_candidate_time_nominated(election, action)
      case types.ELECTION_PUBLIC_KEY : 
        return get_election_pbk(election, action)
      case types.ELECTION_PRIVATE_KEY :
        return get_election_pvk(election, action)
      case types.ELECTION_CANDIDATES :
        return get_election_candidates(election, action)
      case types.ELECTION_VOTES :
        return get_election_votes(election, action)
      case types.ELECTION_STAGE :
        return get_election_stage(election, action)
      case types.ELECTION_TYPE :
        return get_election_type(election, action)
      default:
        return election;
    }
  }
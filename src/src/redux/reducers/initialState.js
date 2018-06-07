export default {
    election : {
        voting_address: null,
        registration_address: null,

        stage: null,
        
        admin: null,
        election_type: null,
        name: null,

        r_begin: null,
        r_end: null,

        v_begin: null,
        v_end: null,

        candidates: null,

        status_voter: {
            applied: false,
            checked: false,
            valid: false,
            voted: false,
            time_applied: null,
            time_checked: null,
            nominated: null,
            id_code: null
        },

        status_candidate: {
            applied: false,
            valid: false,
            time_applied: null,
            time_nominated: null,
        },

        public_key: null,
        private_key: null,

        ballots: null

    },
    elections: [],
    user_elections: [],
    admin_elections: [],
    candidate_elections: [],
    metaMask: {
        account: null,
        network: null
    }
}; 
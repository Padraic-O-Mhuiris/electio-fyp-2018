import React, { Component } from 'react'


class UserSwitch extends Component {
    constructor(props) {
        super(props);
        this.state = {
          activeC: "",
          activeV: ""
        };

    }
    
    handleCandidate(props) {
        this.props.changeView("candidate")
        this.setState({
            activeC: "active",
            activeV: ""
        })
    }

    handleVoter(props) {
        this.props.changeView("voter")
        this.setState({
            activeC: "",
            activeV: "active"
        })
    }

    render() {
        if(this.props.metaMask.account === this.props.election.admin) {
            return <div></div>
            
        } else if(this.props.election.status_voter.applied === true){
            return <div></div>

        } else if(this.props.election.election_type === "1") {
            return <div></div>
            
        } else  {
            var c = "box candidate " + this.state.activeC + ""
            var v = "box voter " + this.state.activeV + ""
            return (
                
                <div className="columns userswitch">
                <div className="column is-3"></div>
                <div className="column is-3">
                    <a className={v} onClick={() => this.handleVoter(this.props)}>
                        <h2 className="subtitle">Voter</h2>
                    </a>
                </div>
                <div className="column is-3">
                    <a className={c} onClick={() => this.handleCandidate(this.props)}>
                        <h2 className="subtitle">Candidate</h2>
                    </a>
                </div>
                <div className="column is-3"></div>
                </div>
            )
        }
       
    }
}

export default UserSwitch
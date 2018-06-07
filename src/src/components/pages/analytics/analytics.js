import React, { Component } from 'react'
import Table from "../extras/table"
import ElectionLink from "../extras/table"
import {withRouter} from 'react-router-dom'

class Analytics extends Component {
    constructor(props) {
        super(props);
    }
    
    handleClick(address) {
        this.props.setElection(address)
        this.props.history.push('/')
    }

    render() {
        var arr = []

        for(var i = 0; i < this.props.data.length; i++) {
            var obj = {
                "election_owner": <p className="table-mono-text">{this.props.data[i].election_owner}</p>,

                "election_name": this.props.data[i].election_name,

                "system": this.props.data[i].system,

                "address_vote": <a                    className="table-mono-text" 
                    onClick={this.handleClick.bind(this, this.props.data[i].address_vote)}>
                    <i className="fa fa-circle" ></i> {this.props.data[i].address_vote}
                    </a>,

                "created_at": <p className="table-date-text">{(new Date(this.props.data[i].created_at * 1000) + "")}</p>
            }
            arr.push(obj)
        }
        return (
            <div className="column is-12">
                <div className="box analytics">
                    <Table
                        data={arr}
                        header={[
                            {
                                name: "Owner",
                                prop: "election_owner"
                            },
                            {
                                name: "Name",
                                prop: "election_name"
                            },
                            {
                                name: "Electoral System",
                                prop: "system"
                            },
                            {
                                name: "Voting",
                                prop: "address_vote"
                            },
                            {
                                name: "Date",
                                prop: "created_at"
                            }

                        ]}
                    />
                </div>
            </div>
        )
    }
}

export default withRouter(Analytics)
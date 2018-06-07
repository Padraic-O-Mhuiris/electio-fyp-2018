import React, { Component } from 'react'

import 'font-awesome/css/font-awesome.css'
import Table from '../../extras/table'

class VotesTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            items : ""
        }
    }

    setVotesTable() {
        var _items = []
        for(var i = 0; i < this.props.election.ballots.length; i++) {

            var _vote = <p className="table-mono-text">{this.props.election.ballots[i].vote}</p>

            var obj = {
                "number" : i,
                "vote" : _vote,
                "timestamp" : <p className="table-date-text">{(new Date(this.props.election.ballots[i].timestamp * 1000) + "")}</p>
            }

            _items.push(obj)
        }

        this.setState({
            items : _items
        })
    }

    componentWillMount() {
        this.setVotesTable()
    }

    componentWillReceiveProps() {
        this.setVotesTable()
    }   

    render() {
        return (
            <Table
            data={this.state.items}
            header={[
                {
                    name: "#",
                    prop: "number"
                },
                {
                    name: "Encrypted Vote",
                    prop: "vote"
                },
                {
                    name: "Timestamp",
                    prop: "timestamp"
                },

            ]}
        />
        )
    }
}

export default VotesTable
import React, { Component } from 'react'



class Table extends Component {

    render() {

        const row = (x, i, header) => (
            <tr key={`tr-${i}`}>
                {
                    header.map((y, k) => (
                        <td key={`trc-${k}`}>
                            {x[y.prop]}
                        </td>
                    ))
                }
            </tr>
        )

        return (
            <table className="table is-fullwidth table is-striped">
                <thead>
                    <tr>
                        {
                            this.props.header.map((x, i) => 
                                <th key={`thc-${i}`}>
                                    {x.name}
                                </th>
                            )
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        this.props.data.map((x, i) => row(x, i, this.props.header))
                    }
                </tbody>
            </table>
        )
    }
}

export default Table
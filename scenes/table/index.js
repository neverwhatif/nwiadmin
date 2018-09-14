import React, { Component } from 'react';

import ConnectedTable from 'nwiadmin/components/connectedtable';

class TableScene extends Component {
    constructor(props) {
        super(props);

        if (this.setInitialState) {
            this.setInitialState(props);
        }
    }

    render() {
        return (
            <ConnectedTable
                remote={this.state.remote}
                transformer={this.state.transformer}
                filters={this.state.filters}
                filterMap={this.state.filterMap}
                actions={this.state.actions}
            />
        );
    }
}

export default TableScene;

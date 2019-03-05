import React, { Component } from 'react';

import ConnectedList from 'nwiadmin/components/connectedlist';

class ListScene extends Component {
    constructor(props) {
        super(props);

        if (this.setInitialState) {
            this.setInitialState(props);
        }
    }

    render() {
        return (
            <ConnectedList
                remote={this.state.remote}
                transformer={this.state.transformer}
                filters={this.state.filters}
                filterMap={this.state.filterMap}
                actions={this.state.actions}
            />
        );
    }
}

export default ListScene;

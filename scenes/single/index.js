import React, { Component } from 'react';
import { withPath } from 'nwiadmin/utility/proptypes';

import ConnectedScene from 'nwiadmin/components/connectedscene';
import NestedSwitch from 'nwiadmin/components/nestedswitch';

class SingleScene extends Component {
    constructor(props) {
        super(props);

        if (this.setInitialState) {
            this.setInitialState(props);
        }
    }

    render() {
        const basePath = `${this.props.basePath}/${this.props.match.params.id}`;

        return (
            <ConnectedScene
                basePath={basePath}
                remote={this.state.remote}
                transformer={this.state.transformer}
                tabs={this.state.nav.single}
            >
                <NestedSwitch basePath={basePath} routes={this.state.nav.single} />
            </ConnectedScene>
        );
    }
}

SingleScene.propTypes = { ...withPath };

export default SingleScene;

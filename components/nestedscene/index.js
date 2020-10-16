import React from 'react';
import { withRouter } from 'react-router';

import ConnectedScene from 'nwiadmin/components/connectedscene';
import NestedSwitch from 'nwiadmin/components/nestedswitch';
import Scene from 'nwiadmin/components/scene';

const NestedScene = ({ back, basePath, message, match, nav, remote, title, transformer }) => {
    if (!remote) {
        return (
            <Scene basePath={basePath} title={title} tabs={nav.single} back={back}>
                <NestedSwitch basePath={basePath} routes={nav.single} />
            </Scene>
        );
    }

    const connectedBasePath = `${basePath}/${match.params.id}`;

    return (
        <ConnectedScene
            basePath={connectedBasePath}
            message={message}
            remote={remote}
            transformer={transformer}
            back={back}
            tabs={nav.single}
        >
            <NestedSwitch basePath={connectedBasePath} routes={nav.single} />
        </ConnectedScene>
    );
};

export default withRouter(NestedScene);

import React from 'react';
import { PropTypes } from 'prop-types';

import { logDeprecated } from 'nwiadmin/utility';

import { useAppContext } from 'nwiadmin/services/context';

const Meable = (ComponentToWrap) => {
    logDeprecated('Meable');

    const MeableComponent = (props) => {
        const appContext = useAppContext();
        return <ComponentToWrap {...props} me={appContext.me || null} />;
    };

    return MeableComponent;
};

export default Meable;

import React from 'react';
import { PropTypes } from 'prop-types';

import { useAppContext } from 'nwiadmin/services/context';

const Meable = (ComponentToWrap) => {
    console.warn('Meable is deprecated, and will be removed in a future version');

    const MeableComponent = (props) => {
        const appContext = useAppContext();
        return (<ComponentToWrap {...props} me={appContext.me || null} />);
    }

    return MeableComponent;
};

export default Meable;

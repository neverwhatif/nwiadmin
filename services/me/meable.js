import React from 'react';
import { PropTypes } from 'prop-types';

const Meable = (ComponentToWrap) => {
    console.warn('Meable is deprecated, and will be removed in a future version');

    const MeableComponent = (props, context) => (
        <ComponentToWrap {...props} me={context.me || null} />
    );

    MeableComponent.contextTypes = {
        me: PropTypes.object,
    };

    return MeableComponent;
};

export default Meable;

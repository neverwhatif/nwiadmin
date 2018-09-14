import React from 'react';
import { PropTypes } from 'prop-types';

const Meable = (ComponentToWrap) => {
    const MeableComponent = (props, context) => (
        <ComponentToWrap {...props} me={context.me || null} />
    );

    MeableComponent.contextTypes = {
        me: PropTypes.object,
    };

    return MeableComponent;
};

export default Meable;

//
// Component: Banner
//
// Description: Really just a very basic wrapper around the logo, navigation, and mepanel components. Will not render
// anything if either there is no 'me' prop or there has been an error
//
// Props:
// me (object): The me object injected via the 'meable' function
// isError (bool): Whether or not an error has occured higher in the hierarchy
//

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import meable from 'nwiadmin/services/me/meable';

import PrimaryNav from 'nwiadmin/components/primarynav';
import BannerLogo from './bannerlogo';
import MePanel from './mepanel';

export const BannerComponent = ({ me, isError }) => (
    <Fragment>
        {me && !isError && (
            <Fragment>
                <BannerLogo />
                <PrimaryNav />
                <MePanel data={me} />
            </Fragment>
        )}
    </Fragment>
);

BannerComponent.propTypes = {
    me: PropTypes.shape({
        first_name: PropTypes.string,
        last_name: PropTypes.string,
        name: PropTypes.string,
    }),
    isError: PropTypes.bool,
};

BannerComponent.defaultProps = {
    me: null,
    isError: false,
};

export default meable(BannerComponent);

//
// Component: Banner
//
// Description: Really just a very basic wrapper around the logo, navigation, and mepanel components. Will not render
// anything if either there is no 'me' prop or there has been an error
//
// Props:
// isError (bool): Whether or not an error has occured higher in the hierarchy
//

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { useAppContext } from 'nwiadmin/services/context';

import PrimaryNav from 'nwiadmin/components/primarynav';
import BannerLogo from './bannerlogo';
import MePanel from './mepanel';

export const BannerComponent = ({ isError }) => {
    const appContext = useAppContext();

    if(!appContext.me || isError) {
        return null;
    }

    return (<Fragment>
        <BannerLogo />
        <PrimaryNav />
        <MePanel data={appContext.me} />
    </Fragment>);
}

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

export default BannerComponent;

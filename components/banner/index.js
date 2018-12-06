import React, { Fragment } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import store from 'nwiadmin/utility/store';

import meable from 'nwiadmin/services/me/meable';

import PrimaryNav from 'nwiadmin/components/primarynav';
import BannerLogo from './bannerlogo';
import MePanel from './mepanel';

import styles from './styles.scss';

/*<header className={classNames(styles.root, store.getItem('pink') ? styles.rootPink : null)}>*/
/*</header>*/

export const BannerComponent = props => (
    <Fragment>
        {props.me && !props.isError && (
            <Fragment>
                <BannerLogo />
                <PrimaryNav />
                <MePanel data={props.me} />
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

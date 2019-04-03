import React from 'react';
import classNames from 'classnames';

import Link from 'nwiadmin/components/link';
import Logo from 'app/components/logo';
import config from 'app/config';

import styles from './styles.scss';

const isDev = config.env !== 'production';
const devString = 'You are on a development version of the site. Any changes you make will not have an affect on live accounts.';

const BannerLogo = () => (
    <h1 className={classNames(styles.root, isDev ? styles.rootDev : null)}>
        <Link to="/" className={styles.link} title={isDev ? devString : null}>
            <Logo className={styles.img} isReverse />
        </Link>
    </h1>
);

export default BannerLogo;

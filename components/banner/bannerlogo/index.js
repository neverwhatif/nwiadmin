import React from 'react';

import Link from 'nwiadmin/components/link';
import Logo from 'app/components/logo';

import styles from './styles.scss';

const BannerLogo = () => (
    <h1 className={styles.root}>
        <Link to="/" className={styles.link}>
            <Logo className={styles.img} isReverse />
        </Link>
    </h1>
);

export default BannerLogo;

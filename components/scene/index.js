import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { setDocumentTitle } from 'nwiadmin/services/app';

import ErrorBoundary from 'nwiadmin/components/errorboundary';
import Tabs from 'nwiadmin/components/tabs';

import styles from './styles.scss';

const Scene = ({ basePath, children, subtitle, tabs, title, shouldSetDocumentTitle }) => {
    useEffect(() => {
        if (shouldSetDocumentTitle) {
            setDocumentTitle(title);
        }
    }, []);

    return (
        <ErrorBoundary isScene>
            <main className={styles.root}>
                {title && (
                    <header className={styles.header}>
                        <h1 className={styles.title}>{title}</h1>
                        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
                    </header>
                )}
                {tabs && <Tabs data={tabs} basePath={basePath} />}
                <section className={styles.content}>{children}</section>
            </main>
        </ErrorBoundary>
    );
};

Scene.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    tabs: PropTypes.arrayOf(
        PropTypes.shape({
            data: PropTypes.arrayOf(
                PropTypes.shape({
                    label: PropTypes.string.isRequired,
                    path: PropTypes.string.isRequired,
                })
            ),
        })
    ),
    basePath: PropTypes.string,
    children: PropTypes.node,
    shouldSetDocumentTitle: PropTypes.bool,
};

Scene.defaultProps = {
    title: null,
    subtitle: null,
    tabs: null,
    basePath: '',
    children: null,
    shouldSetDocumentTitle: true,
};

export default Scene;

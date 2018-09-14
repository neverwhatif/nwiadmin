import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { setDocumentTitle } from 'nwiadmin/services/app';

import ErrorBoundary from 'nwiadmin/components/errorboundary';
import Tabs from 'nwiadmin/components/tabs';

import styles from './styles.scss';

class Scene extends Component {
    componentDidMount() {
        if (this.props.shouldSetDocumentTitle) {
            setDocumentTitle(this.props.title);
        }
    }
    render() {
        return (
            <ErrorBoundary isScene>
                <main className={styles.root}>
                    {this.props.title && (
                        <header className={styles.header}>
                            <h1 className={styles.title}>{this.props.title}</h1>
                            {this.props.subtitle && (
                                <p className={styles.subtitle}>{this.props.subtitle}</p>
                            )}
                        </header>
                    )}
                    {this.props.tabs && (<Tabs data={this.props.tabs} basePath={this.props.basePath} />)}
                    <section className={styles.content}>
                        {this.props.children}
                    </section>
                </main>
            </ErrorBoundary>
        );
    }
}

Scene.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    tabs: PropTypes.arrayOf(PropTypes.shape({
        data: PropTypes.arrayOf(PropTypes.shape({
            label: PropTypes.string.isRequired,
            path: PropTypes.string.isRequired,
        })),
    })),
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

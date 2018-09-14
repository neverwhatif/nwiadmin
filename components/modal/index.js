import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router';
import { addPrefixToClassNames } from 'nwiadmin/utility';

import FormLegend from 'nwiadmin/components/form/formlegend';
import ReactModal from 'react-modal';

import styles from './styles.scss';

ReactModal.setAppElement(document.body);

export class ModalComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isAllowedOpen: true,
        };

        // The bind method works better for unit test coverage in this instance
        this.onRequestClose = this.props.onRequestClose.bind(this);
    }

    componentWillReceiveProps(newProps) {
        if (this.props.location && newProps.location && this.props.location.pathname !== newProps.location.pathname) {
            this.setState({ isAllowedOpen: false });
        }
    }

    render() {
        const contentClass = classNames(addPrefixToClassNames(styles, 'content', this.props.type));

        const scrollClasses = classNames(
            styles.scroll,
            this.props.title ? styles.scrollHasTitle : null,
        );

        return (
            <ReactModal
                isOpen={this.state.isAllowedOpen && this.props.isOpen}
                portalClassName={styles.root}
                overlayClassName={styles.overlay}
                className={contentClass}
                contentLabel="Modal"
                onRequestClose={this.onRequestClose}
            >
                {this.props.title && (
                    <div className={styles.title}>
                        <FormLegend isOffset>{this.props.title}</FormLegend>
                    </div>
                )}
                <div className={scrollClasses}>
                    {this.props.children}
                </div>
            </ReactModal>
        );
    }
}

ModalComponent.propTypes = {
    children: PropTypes.node.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onRequestClose: PropTypes.func,
    location: PropTypes.shape({
        pathname: PropTypes.string,
    }),
    type: PropTypes.string,
    title: PropTypes.string,
};

ModalComponent.defaultProps = {
    onRequestClose: () => null,
    location: null,
    type: undefined, // Undefined instead of null, to make sure 'addPrefixToClassNames' defaults properly
    title: null,
};

export default withRouter(ModalComponent);

import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { ucwords } from 'nwiadmin/utility';

import Link from 'nwiadmin/components/link';

import styles from './styles.scss';

const Button = (props) => {
    const rootClass = classNames(
        styles.root,
        props.buttonStyle ? styles[`root${ucwords(props.buttonStyle)}`] : null,
        props.isDisabled ? styles.rootDisabled : null,
    );

    if (props.to) {
        return (
            <Link to={props.to} className={rootClass}>{props.children}</Link>
        );
    }

    return (
        <button
            type="button"
            onClick={e => props.onClick(e)}
            className={rootClass}
            disabled={props.isDisabled}
            style={props.style}
        >
            {props.children}
        </button>
    );
};

Button.propTypes = {
    to: PropTypes.string,
    buttonStyle: PropTypes.string,
    onClick: PropTypes.func,
    children: PropTypes.node,
    isDisabled: PropTypes.bool,
    style: PropTypes.shape({}),
};

Button.defaultProps = {
    to: null,
    buttonStyle: null,
    onClick: () => null,
    children: null,
    isDisabled: false,
    style: null,
};

export const PrimaryButton = props => (
    <Button {...props} buttonStyle="primary" />
);

export default Button;

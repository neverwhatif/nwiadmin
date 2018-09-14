import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';

const Link = ({ isExternal, ...props }) => (
    isExternal ? (
        <a href={props.to} target="_blank" rel="noopener noreferrer">{props.children}</a>
    ) : (
        <RouterLink {...props}>{props.children}</RouterLink>
    )
);

Link.propTypes = {
    className: PropTypes.string,
    to: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};

Link.defaultProps = {
    className: null,
};

export default Link;

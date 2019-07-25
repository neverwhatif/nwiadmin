import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';

const Link = ({ to, isExternal, children, ...otherProps }) => {
    const newWindowParams = isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {};

    if (to.match(/^http/u) || to.match(/^mailto:/u) || to.match(/^tel:/u)) {
        return (
            <a href={to} {...otherProps} {...newWindowParams}>
                {children}
            </a>
        );
    }

    return (
        <RouterLink to={to} {...otherProps} {...newWindowParams}>
            {children}
        </RouterLink>
    );
};

Link.propTypes = {
    children: PropTypes.node.isRequired,
    to: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.shape({})])),
    ]).isRequired,
    className: PropTypes.string,
    isExternal: PropTypes.bool,
    onClick: PropTypes.func,
};

Link.defaultProps = {
    isExternal: false,
    className: null,
    onClick: () => null,
};

export default Link;

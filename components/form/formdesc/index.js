import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './styles.scss';

const FormDesc = ({ children, isSubtle, isTitle }) => {
    const rootClass = classNames(
        styles.root,
        isSubtle ? styles.rootSubtle : null,
        isTitle ? styles.rootTitle : null,
    );

    return (
        <p className={rootClass}>{children}</p>
    );
};

FormDesc.propTypes = {
    isSubtle: PropTypes.bool,
    isTitle: PropTypes.bool,
    children: PropTypes.node.isRequired,
};

FormDesc.defaultProps = {
    isSubtle: false,
    isTitle: false,
};

export default FormDesc;

import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import styles from './styles.scss';

const FormRow = (props) => {
    const rootClass = classNames(styles.root, styles[`root${props.children.length}`]);

    return (
        <div className={rootClass}>
            {props.children}
        </div>
    );
};

FormRow.propTypes = {
    children: PropTypes.node.isRequired,
};

export default FormRow;

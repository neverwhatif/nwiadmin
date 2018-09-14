/* eslint-disable react/no-danger */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { addPrefixToClassNames } from 'nwiadmin/utility';

import FilterBarCta from 'nwiadmin/components/filterbar/filterbarcta';

import styles from './styles.scss';

const Message = ({
    type,
    children,
    cta,
    isDangerouslySet,
}) => {
    const rootClass = classNames(addPrefixToClassNames(styles, 'root', type));

    return (
        <aside className={rootClass}>
            {isDangerouslySet
                ? (<div className={styles.description} dangerouslySetInnerHTML={{ __html: children }} />)
                : (<div className={styles.description}>{children}</div>)
            }
            {cta && (
                <footer className={styles.cta}>
                    <FilterBarCta data={cta} />
                </footer>
            )}
        </aside>
    );
};

Message.propTypes = {
    type: PropTypes.string,
    cta: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string.isRequired,
        action: PropTypes.func.isRequired,
    })),
    children: PropTypes.node.isRequired,
    isDangerouslySet: PropTypes.bool,
};

Message.defaultProps = {
    type: null,
    cta: null,
    isDangerouslySet: false,
};

export default Message;

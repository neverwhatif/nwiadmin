import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { parseTabs } from 'nwiadmin/services/nav';
import { withLocation } from 'nwiadmin/utility/proptypes';
import Allow from 'nwiadmin/components/allow';

import TabItem from './tabitem';

import styles from './styles.scss';

const renderItem = (item) => (
    <li key={item.key} className={styles.item}>
        <TabItem {...item} />
    </li>
);

const TabsComponent = ({ basePath, data, location }) => (
    <ul className={styles.root}>
        {parseTabs(data, basePath, location.pathname).map((item) =>
            item.permission ? (
                <Allow permission={item.permission} key={item.key}>
                    {renderItem(item)}
                </Allow>
            ) : (
                renderItem(item)
            )
        )}
    </ul>
);

TabsComponent.propTypes = {
    ...withLocation,
    data: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            path: PropTypes.string.isRequired,
            isActive: PropTypes.bool,
            isDisabled: PropTypes.bool,
        })
    ).isRequired,
    basePath: PropTypes.string,
};

TabsComponent.defaultProps = {
    basePath: '',
};

export default withRouter(TabsComponent);

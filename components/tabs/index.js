import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';

import { parseTabs } from 'nwiadmin/services/nav';
import { withLocation } from 'nwiadmin/utility/proptypes';
import Allow from 'nwiadmin/components/allow';

import TabItem from './tabitem';

import styles from './styles.scss';

const renderItem = (item) => (
    <li
        key={item.key}
        className={classNames(styles.item, item.isActive ? styles.itemActive : null)}
    >
        <TabItem {...item} />
    </li>
);

const TabsComponent = ({ back, basePath, data, location }) => {
    const control = useRef();
    const [isOpen, setOpen] = useState(false);

    const toggleOpen = () => setOpen(!isOpen);

    const handleClickOutside = (event) => {
        if (control.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, false);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div className={classNames(styles.root, isOpen ? styles.rootOpen : null)}>
            <ul className={styles.list}>
                {Boolean(back) && <li className={styles.item}><TabItem path={back[0]} label={back[1] ? `← ${back[1]}` : '← Back'} /></li>}
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
            <button type="button" className={styles.control} onClick={toggleOpen} ref={control}>
                Menu
            </button>
        </div>
    );
};

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

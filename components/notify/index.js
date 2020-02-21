import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import PubSub from 'pubsub-js';

import { addPrefixToClassNames } from 'nwiadmin/utility';

import styles from './styles.scss';

const handleClose = () => {
    PubSub.publish('@notify/SEND', {});
};

const Notify = () => {
    const [type, setType] = useState(null);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        const sub = PubSub.subscribe('@notify/SEND', (key, data) => {
            setType(data.type);
            setMessage(data.message);
        });

        return (() => {
            PubSub.unsubscribe(sub);
        });
    });

    if(!message) {
        return null;
    }

    const contentClass = classNames(addPrefixToClassNames(styles, 'content', type));

    return (
        <aside className={styles.root}>
            <div className={contentClass}>
                <p className={styles.desc}>{message}</p>
                <button className={styles.close} onClick={handleClose}>Close</button>
            </div>
        </aside>
    );
};

export default Notify;

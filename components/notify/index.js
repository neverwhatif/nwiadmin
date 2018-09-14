import React, { Component } from 'react';
import classNames from 'classnames';
import PubSub from 'pubsub-js';

import { addPrefixToClassNames } from 'nwiadmin/utility';

import styles from './styles.scss';

const closeMessage = () => {
    PubSub.publish('@notify/SEND', {});
};

class Notify extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: '',
            message: '',
        };
    }

    componentWillMount() {
        this.subscription = PubSub.subscribe('@notify/SEND', (key, data) => {
            const { type, message } = data;
            this.setState({
                type,
                message,
            });
        });
    }

    componentWillUnmount() {
        PubSub.unsubscribe(this.subscription);
    }

    render() {
        if (!this.state.message) {
            return null;
        }

        const contentClass = classNames(addPrefixToClassNames(styles, 'content', this.state.type));

        return (
            <aside className={styles.root}>
                <div className={contentClass}>
                    <p className={styles.desc}>{this.state.message}</p>
                    <button className={styles.close} onClick={() => closeMessage()}>Close</button>
                </div>
            </aside>
        );
    }
}

export default Notify;

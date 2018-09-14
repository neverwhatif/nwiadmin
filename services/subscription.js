import Echo from 'laravel-echo';
/* eslint-disable no-unused-vars */
import Pusher from 'pusher-js';
/* eslint-enable */

import config from 'app/config';
import { getAuthedHeaders } from 'nwiadmin/services/auth';

if (!config.pusher) {
    throw new Error('Pusher credentials not defined');
}

const Subscription = new Echo({
    auth: {
        headers: getAuthedHeaders(),
    },
    authEndpoint: config.pusher.authEndpoint,
    broadcaster: 'pusher',
    cluster: 'eu',
    key: config.pusher.key,
    namespace: '',
});

export default Subscription;

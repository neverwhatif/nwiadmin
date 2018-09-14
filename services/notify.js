import PubSub from 'pubsub-js';

export const notify = (type, message) => {
    PubSub.publish('@notify/SEND', { type, message });
};

export const notifySuccess = message => notify('success', message);
export const notifyError = message => notify('error', message);
export const clearNotify = () => notify();

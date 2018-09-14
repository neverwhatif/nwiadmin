import PubSub from 'pubsub-js';

const publish = (message, data) => PubSub.publish(message, data);
const subscribe = (message, func) => PubSub.subscribe(message, func);
const unsubscribe = (value) => PubSub.unsubscribe(value);

export default {
    publish,
    subscribe,
    unsubscribe,
};

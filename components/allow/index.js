import meable from 'nwiadmin/services/me/meable';

const Allow = (props) => {
    if (!props.permission || props.me.permissions.indexOf(props.permission) === -1) {
        return null;
    }

    return props.children;
};

export default meable(Allow);

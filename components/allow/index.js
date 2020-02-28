//
// Component: Allow
//
// Description: Checks if the current user has a particular permission, and will render either its child components or
// null, depending on the result
//
// Props:
// permission (string): The name of the permission that determines whether or not the child components are rendererd.
// children (node): The elements that may or may not be displayed
//

import PropTypes from 'prop-types';

import { useAppContext } from 'nwiadmin/services/context';

const Allow = ({ permission, children }) => {
    const appContext = useAppContext();

    if (!permission || !appContext.me.permissions || appContext.me.permissions.indexOf(permission) === -1) {
        return null;
    }

    return children;
};

Allow.propTypes = {
    me: PropTypes.shape({
        first_name: PropTypes.string,
        last_name: PropTypes.string,
        name: PropTypes.string,
    }),
    permission: PropTypes.string,
};

Allow.defaultProps = {
    me: null,
    permission: '',
};

export default Allow;

import React from 'react';
import { withConnected, withLocation, defaultWithConnected } from 'nwiadmin/utility/proptypes';

import { withRouter } from 'react-router';

import { ConnectedListComponent } from 'nwiadmin/components/connectedlist';
import Table from 'nwiadmin/components/table';

export const ConnectedTableComponent = props => (
    <ConnectedListComponent {...props} renderList={data => <Table {...data} />} />
);

ConnectedTableComponent.propTypes = {
    ...withConnected,
    ...withLocation,
};

ConnectedTableComponent.defaultProps = {
    ...defaultWithConnected,
};

export default withRouter(ConnectedTableComponent);

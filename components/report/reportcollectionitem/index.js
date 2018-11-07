import React from 'react';
import PropTypes from 'prop-types';

import { convertDataToLandscape } from 'nwiadmin/services/table';

import { reportTransformer as transformer } from 'app/config/transformers';

import reports from 'app/components/reports';

import Table from 'nwiadmin/components/table';
import ReportCollectionPanel from '../reportcollectionpanel';

const CollectionItemEmpty = () => (
    <p><em>No data found with these filters. Adjust the filters above to display data.</em></p>
);

const CollectionItem = (props) => {
    const data = props.type === 'landscape' ? convertDataToLandscape(props.data[0], props.columns) : props.data;

    if (props.type === 'landscape') {
        return (
            <ReportCollectionPanel title={props.name} isDisabled={props.isDisabled}>
                {Boolean(data.length) ? (
                    <Table data={data} hasHead={false} />
                ) : (
                    <CollectionItemEmpty />
                )}
            </ReportCollectionPanel>
        );
    } else if (props.type === 'basic') {
        return (
            <ReportCollectionPanel title={props.name} isDisabled={props.isDisabled}>
                {Boolean(data.length) ? (
                    <Table data={data} columns={props.columns} totals={props.totals} transformer={transformer} />
                ) : (
                    <CollectionItemEmpty />
                )}
            </ReportCollectionPanel>
        );
    }

    const ReportComponent = reports[props.type];

    return (
        <ReportCollectionPanel title={props.name} isDisabled={props.isDisabled}>
            {Boolean(data.length) ? (
                <ReportComponent data={data} columns={props.columns} />
            ) : (
                <CollectionItemEmpty />
            )}
        </ReportCollectionPanel>
    );
};

CollectionItem.propTypes = {
    columns: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.string.isRequired,
    })).isRequired,
    data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    isDisabled: PropTypes.bool,
};

CollectionItem.defaultProps = {
    isDisabled: false,
    type: '',
};

export default CollectionItem;

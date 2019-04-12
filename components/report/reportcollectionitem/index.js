import React from 'react';
import PropTypes from 'prop-types';

import { convertDataToLandscape } from 'nwiadmin/services/table';

import reports from 'app/components/reports';

import Table from 'nwiadmin/components/table';
import ReportCollectionPanel from '../reportcollectionpanel';

const reportTransformer = (item, $id, columns) =>
    columns.reduce(
        (acc, cur) => {
            acc[cur.title] = format(item[cur.key], cur.type);
            return acc;
        },
        { $id }
    );


const ReportCollectionItemEmpty = () => (
    <p><em>No data found with these filters. Adjust the filters above to display data.<br /><br /></em></p>
);

const ReportCollectionItem = (props) => {
    const data = props.type === 'landscape' ? convertDataToLandscape(props.data[0], props.columns) : props.data;

    if (props.type === 'landscape') {
        return (
            <ReportCollectionPanel title={props.name} isDisabled={props.isDisabled}>
                {Boolean(data.length) ? (
                    <Table data={data} hasHead={false} />
                ) : (
                    <ReportCollectionItemEmpty />
                )}
            </ReportCollectionPanel>
        );
    } else if (props.type === 'basic') {
        return (
            <ReportCollectionPanel title={props.name} isDisabled={props.isDisabled}>
                {Boolean(data.length) ? (
                    <Table data={data} columns={props.columns} totals={props.totals} transformer={reportTransformer} />
                ) : (
                    <ReportCollectionItemEmpty />
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
                <ReportCollectionItemEmpty />
            )}
        </ReportCollectionPanel>
    );
};

ReportCollectionItem.propTypes = {
    columns: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.string.isRequired,
    })).isRequired,
    data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    isDisabled: PropTypes.bool,
};

ReportCollectionItem.defaultProps = {
    isDisabled: false,
    type: '',
};

export default ReportCollectionItem;

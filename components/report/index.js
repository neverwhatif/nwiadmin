import React from 'react';
import PropTypes from 'prop-types';

import { makeUrl } from 'nwiadmin/services/api';
import { getToken } from 'nwiadmin/services/auth';

import { parseSearch } from 'nwiadmin/utility';

import ConnectedList from 'nwiadmin/components/connectedlist';
import ConnectedTable from 'nwiadmin/components/connectedtable';
import ErrorMessage from 'nwiadmin/components/errormessage';

import { reportTransformer } from 'app/config/transformers';

import ReportCollection from './reportcollection';

const getReportFromData = (data, code) => (data ? data.filter(item => item.code === code)[0] : null);

const downloadCSV = (code, data) => {
    const url = makeUrl(`reports/${code}`, {
        ...parseSearch(data.location.search),
        csv: 1,
        token: getToken(),
    });
    window.open(url);
};

const Report = (props) => {
    const report = getReportFromData(props.data, props.code);
    const [FilterComponent, filterMap, hasSearch] = props.filters;

    if (!report || !report.code) {
        return (<ErrorMessage title={false} description="Report could not be found" />);
    }

    if (report.type === 'basic') {
        return (
            <ConnectedTable
                remote={`reports/${report.code}`}
                transformer={reportTransformer}
                filters={FilterComponent ? f => <FilterComponent {...f} /> : null}
                filterMap={filterMap}
                hasSearch={hasSearch}
                shouldOnlyUpdateWithFilters={props.shouldOnlyUpdateWithFilters}
                cta={[{
                    label: 'Download CSV',
                    action: (e, data) => downloadCSV(props.code, data),
                }]}
            />);
    } else if (report.type === 'collection') {
        return (
            <ConnectedList
                remote={`reports/${report.code}`}
                renderList={data => (
                    <ReportCollection {...data} transformer={reportTransformer} />
                )}
                filters={FilterComponent ? f => <FilterComponent {...f} /> : null}
                filterMap={filterMap}
                hasSearch={hasSearch}
                shouldOnlyUpdateWithFilters={props.shouldOnlyUpdateWithFilters}
            />
        );
    }

    return (<ErrorMessage description={`Report '${report.code}' does not have a valid type`} />);
};

Report.propTypes = {
    code: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(PropTypes.shape({
        code: PropTypes.string.isRequired,
    })),
    filters: PropTypes.arrayOf(PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({}),
        PropTypes.bool,
    ])),
    shouldOnlyUpdateWithFilters: PropTypes.bool,
};

Report.defaultProps = {
    data: null,
    filters: [false],
    shouldOnlyUpdateWithFilters: true,
};

export default Report;

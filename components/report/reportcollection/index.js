import React from 'react';
import PropTypes from 'prop-types';

import { Column, Row } from 'nwiadmin/components/layout';
import CollectionItem from '../reportcollectionitem';

const ReportCollection = props => (
    <Row>
        {Object.entries(props.data || {}).map(report => (
            <Column key={report[0]}>
                <CollectionItem {...report[1]} isDisabled={props.isDisabled} />
            </Column>
        ))}
    </Row>
);

ReportCollection.propTypes = {
    data: PropTypes.shape({}),
    isDisabled: PropTypes.bool,
};

ReportCollection.defaultProps = {
    data: null,
    isDisabled: false,
};

export default ReportCollection;

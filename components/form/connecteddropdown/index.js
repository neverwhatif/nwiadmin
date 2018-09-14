import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { parseRemote } from 'nwiadmin/utility';
import { withConnected, defaultWithConnected } from 'nwiadmin/utility/proptypes';

import { get } from 'nwiadmin/services/api';

import { Dropdown } from 'nwiadmin/components/form';

class ConnectedDropdown extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isDataLoading: true,
            dataError: '',
            data: [],
        };
    }

    componentWillMount() {
        this.getData();
    }

    getData() {
        this.setState({
            isDataLoading: true,
        });

        const parsedRemote = parseRemote(this.props.remote);

        get(parsedRemote.alias, parsedRemote.params)
            .then(response => this.setState({
                data: this.parseData(response.data),
                isDataLoading: false,
            }))
            .catch(error => this.setState({
                dataError: error.toString(),
            }));
    }

    parseData(data) {
        return this.props.allOption ? [{ id: 0, name: this.props.allOption }, ...data] : data;
    }

    render() {
        if (this.state.dataError) {
            return (<div>Error: {this.state.dataError}</div>);
        }

        if (this.state.isDataLoading) {
            return (<Dropdown data={[]} isLoading />);
        }

        const { remote, ...otherProps } = this.props;

        return (
            <Dropdown data={this.state.data} {...otherProps} />
        );
    }
}

ConnectedDropdown.propTypes = {
    ...withConnected,
    transformer: PropTypes.func,
};

ConnectedDropdown.defaultProps = {
    ...defaultWithConnected,
    transformer: item => item,
};

export default ConnectedDropdown;

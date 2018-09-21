import React, { Component } from 'react';

import { parseRemote } from 'nwiadmin/utility';
import { get } from 'nwiadmin/services/api';

import TextInput from '../textinput';
import DropdownList from '../dropdown/dropdownlist';

import styles from './styles.scss';

class Autocomplete extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isDataLoading: false,
            value: ''
        };

        this.selectItem = this.selectItem.bind(this);
    }

    selectItem(item) {
        this.setState({ data: [], value: item.name });
        this.props.onChange({ target: { name: this.props.name, value: item.id } }) ;
    }

    getData(search) {
        this.setState({
            isDataLoading: true,
            value: search,
        });

        const parsedRemote = parseRemote(this.props.remote);
        const params = {
            ...parsedRemote.params,
            filter: { search },
        };

        get(parsedRemote.alias, params, { cancellable: true })
            .then(response => this.setState({
                data: response.data ? response.data : this.state.data,
                isDataLoading: false,
            }))
            .catch(error => this.setState({
                dataError: error.toString(),
            }));
    }

    render() {
        return (
            <div className={styles.root}>
                <TextInput
                    value={this.state.value}
                    onChange={(e) => this.getData(e.target.value)}
                    placeholder="Start typing..."
                />
                <DropdownList
                    data={this.state.data}
                    isOpen={Boolean(this.state.data.length)}
                    onItemClick={this.selectItem}
                />
            </div>
        );
    }
}

export default Autocomplete;

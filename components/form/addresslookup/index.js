import React, { Component } from 'react';

import { renderFields } from '../helpers';

const fields = () => [{
    label: 'Address Name',
    name: 'address_name',
}];

class AddressLookup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pendingData: {},
        };
    }

    setInput(e) {
        const { target: { name, value } } = e;
        this.props.onChange(e);
    }

    render() {
        const { pendingData, errors } = this.state;

        return (
            <div>
                {renderFields(fields(), pendingData, e => this.setInput(e), errors)}
            </div>
        );
    }
}

export default AddressLookup;

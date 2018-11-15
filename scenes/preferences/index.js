import React, { Component } from 'react';

import Scene from 'nwiadmin/components/scene';
import FixedBar from 'nwiadmin/components/fixedbar';
import store from 'nwiadmin/utility/store';
import { notifySuccess } from 'nwiadmin/services/notify';

import Button from 'nwiadmin/components/button';
import { Checkbox, Fieldset, FormField } from 'nwiadmin/components/form';
import { renderFields } from 'nwiadmin/components/form/helpers';

const defaultData = {
    pink: false,
};

class PreferenceScene extends Component {
    constructor(props) {
        super(props);

        const data = store.getObject('preferences') || { ...defaultData };
        this.state = { data };
    }

    setCheckboxInput(e) {
        const { target: { name, checked } } = e;
        this.setState(oldState => ({ data: { ...oldState.data, [name]: checked ? true : false } }));
    }

    submit() {
        store.setObject('preferences', this.state.data);
        notifySuccess('Your preferences have been saved successfully');
    }

    render() {
        return (
            <Scene title="Preferences">
                <Fieldset legend="Preferences">
                    <FormField>
                        <Checkbox
                            name="pink"
                            value={this.state.data.pink}
                            onChange={e => this.setCheckboxInput(e)}
                            labelText="Display pink navigation"
                        />
                    </FormField>
                </Fieldset>

                <FixedBar>
                    <Button onClick={() => this.submit()}>Save Preferences</Button>
                </FixedBar>
            </Scene>
        );
    }
}

export default PreferenceScene;

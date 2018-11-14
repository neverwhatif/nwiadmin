/* eslint-disable class-methods-use-this, react/no-unused-state */

import { Component } from 'react';
import PubSub from 'pubsub-js';

import { request } from 'nwiadmin/services/api';
import { checkAuthResponse } from 'nwiadmin/services/auth';
import { notifySuccess, notifyError, clearNotify } from 'nwiadmin/services/notify';
import { getFieldValue, setUpdatedData } from 'nwiadmin/services/form';

import { diff, parseRemote } from 'nwiadmin/utility';

class FormScene extends Component {
    constructor(props) {
        super(props);

        this.$setInitialState(props);
        this.$setInitialFieldValues();
    }

    setLabel() {
        return 'Form';
    }

    setMethod() {
        return 'post';
    }

    setImageInput(target, name) {
        this.setState({
            pendingData: setUpdatedData(name, target.files[0], this.state.pendingData),
        });
    }

    getCheckboxValue(checked) {
        return checked ? 1 : 0;
    }

    setInput(e) {
        const { target: { name, value } } = e;

        if (e.target.type === 'file') {
            this.setImageInput(e.target, name);
            return;
        }

        const setValue = e.target.type === 'checkbox'
            ? this.getCheckboxValue(e.target.checked)
            : value;

        this.setState({
            pendingData: setUpdatedData(name, setValue, this.state.pendingData),
        });
    }

    setFields() {
        return [];
    }

    $setInitialFieldValues() {
        const fields = this.setFields();
        const getInitialFieldValues = (array, result = {}) => array.reduce((acc, cur) => {
            if (!cur) {
                return acc;
            }
            if (Array.isArray(cur) || cur.children) {
                return getInitialFieldValues(cur.children || cur, result);
            }
            if (typeof cur.value !== 'undefined') {
                acc[cur.name] = cur.value;
            }
            return acc;
        }, result);

        const initialFieldValues = Object.entries(getInitialFieldValues(fields));

        initialFieldValues.forEach(([key, value]) => {
            const fieldValue = getFieldValue(key, this.state.pendingData);

            if (typeof fieldValue === 'undefined') {
                this.state.pendingData = setUpdatedData(key, value, this.state.pendingData);
            }
        });
    }

    setInitialState() {
        return {};
    }

    $setInitialState(props) {
        const data = this.transformResponse(props.data || {});
        const pendingData = JSON.parse(JSON.stringify(data));

        this.state = {
            data,
            pendingData,
            isLoading: false,
            errors: {},
            shouldNotify: true,
            shouldPublish: true,
            shouldDiffRequest: true,
            shouldUpdateFromResponse: true,
            ...this.setInitialState(props),
        };
    }

    transformRequest(data) {
        return data;
    }

    transformResponse(data) {
        return data;
    }

    transformErrors(errors) {
        return errors;
    }

    responseSuccess(response) {
        this.setState({ isLoading: false });

        if (this.state.shouldUpdateFromResponse) {
            const data = this.transformResponse(response.data);
            const pendingData = { ...data };
            this.setState({ data, pendingData });
        }

        if (this.state.shouldNotify) {
            notifySuccess(`${this.setLabel(response.data)} saved successfully`);
        }
        if (this.state.shouldPublish) {
            PubSub.publish('@currentScene/SET_DATA', response.data);
        }

        if (this.onSubmit) {
            this.onSubmit(response);
        }
    }

    responseError(error) {
        this.setState({ isLoading: false });
        checkAuthResponse(error, () => {
            const { response: { status, data } } = error;

            if (status !== 422 || !data) {
                notifyError('Sorry, something appears to have gone wrong. Please contact the site administrator.');
                return;
            }
            if (this.state.shouldNotify) {
                notifyError('Please double check the form and try again');
            }
            this.setState({ errors: data && data.errors ? this.transformErrors(data.errors) : {} });
        });
    }

    submit() {
        clearNotify();

        const { pendingData } = this.state;

        const remote = this.setRemote ? this.setRemote(pendingData) : null;

        if (!remote) {
            if (this.onSubmit) {
                const data = this.transformRequest(pendingData);
                this.onSubmit(data);
            }
            return;
        }

        this.setState({
            isLoading: true,
            errors: {},
        });

        const method = this.setMethod(pendingData);
        const parsedRemote = parseRemote(remote);

        let diffed = this.state.shouldDiffRequest ? diff(pendingData, this.state.data) : pendingData;

        if(Array.isArray(this.state.shouldDiffRequest)) {
            const undiffed = this.state.shouldDiffRequest.reduce((acc, cur) => {
                acc[cur] = pendingData[cur];
                return acc;
            }, {});

            diffed = { ...diffed, ...undiffed };
        }

        const transformed = this.transformRequest(diffed);

        request(method, parsedRemote.alias, parsedRemote.params, transformed)
            .then(response => this.responseSuccess(response))
            .catch(error => this.responseError(error));
    }
}

export default FormScene;

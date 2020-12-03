import React, { useState } from 'react';
import PubSub from 'pubsub-js';

import { diff, getFromObject, parseRemote } from 'nwiadmin/utility';

import { request } from 'nwiadmin/services/api';
import { notifySuccess, notifyError } from 'nwiadmin/services/notify';

import { ActionField, FormField, FormError, TextInput } from 'nwiadmin/components/form';

export const useFormData = (initialData = {}, defaults = {}) => {
    const [data, setData] = useState({ ...defaults, ...initialData });

    const setFormData = (key, value) => {
        if (typeof key === 'object' && key !== null) {
            setData({ ...data, ...key });
        } else {
            setData({ ...data, [key]: value });
        }
    };

    return [data, setFormData];
};

const getFieldNames = (fields) => {
    if (typeof fields === 'object' && !Array.isArray(fields)) {
        return Object.values(fields)
            .filter((field) => field)
            .reduce((acc, cur) => [...acc, ...(cur || [])], [])
            .map((field) => field.name)
            .filter((name) => name);
    }
    return fields
        .filter((field) => field)
        .map((field) => field.name)
        .filter((name) => name);
};

const getElementOnChangeValue = (target) => {
    if (target.type === 'file') {
        return target.files[0];
    }

    if (target.type === 'checkbox') {
        return target.checked;
    }

    return target.value;
};

const transformResponseDataObject = (parentKey, data) =>
    Object.entries(data).reduce(
        (acc, [key, value]) => ({
            ...acc,
            [`${parentKey}[${key}]`]: value,
        }),
        {}
    );

const transformResponseData = (data, transformResponse) => {
    const transformed = transformResponse(data);

    return Object.entries(transformed).reduce((acc, [key, value]) => {
        if (value && typeof value === 'object' && !Array.isArray(value)) {
            return { ...acc, ...transformResponseDataObject(key, value) };
        }

        return { ...acc, [key]: value };
    }, {});
};

const transformRequestData = (data, transformRequest) => {
    const transformed = transformRequest(data);

    return Object.entries(transformed).reduce((acc, [key, value]) => {
        const matches = key.match(/([^\[]+)\[([^\]]+)\]/);

        if (!matches) {
            return { ...acc, [key]: value };
        }

        const [, parentKey, itemKey] = matches;

        if (acc[parentKey]) {
            return { ...acc, [parentKey]: { ...acc[parentKey], [itemKey]: value } };
        }

        return { ...acc, [parentKey]: { [itemKey]: value } };
    }, {});
};

export const useForm = ({
    data = {},
    fields = [],
    remote = '',
    transformRequest = (d) => d || {},
    transformResponse = (d) => d || {},
    shouldDiffRequest = true,
    shouldPublish = true,
}) => {
    const [method] = remote;

    const fieldNames = getFieldNames(fields);
    const fieldData = getFromObject(
        ['postRaw', 'patchRaw'].indexOf(method) === -1
            ? transformResponseData(data, transformResponse)
            : transformResponse(data),
        fieldNames
    );

    const [formData, setFormData] = useFormData(fieldData);

    const [errors, setErrors] = useState({});
    const [isSubmitting, setSubmitting] = useState(false);

    const handleRenderSelectedFields = (selectedFields) =>
        (selectedFields || []).map((field, index) => {
            if (!field) {
                return;
            }

            if (field === '-') {
                return <hr key={index} />;
            }

            const Component = field.component || TextInput;
            const FieldComponent = field.actionProps ? ActionField : FormField;

            const hasError = Boolean(errors && errors[field.name]);
            const errorMessage = hasError ? errors[field.name][0] : '';

            return (
                <FieldComponent
                    key={field.name}
                    name={field.name}
                    label={field.label}
                    {...(field.actionProps || {})}
                >
                    <Component
                        {...(field.props || {})}
                        value={formData[field.name]}
                        onChange={(event) => {
                            setFormData(field.name, getElementOnChangeValue(event.target));

                            if (field.props && field.props.onChange) {
                                field.props.onChange(event);
                            }
                        }}
                        hasError={hasError}
                    />
                    {hasError && <FormError>{errorMessage}</FormError>}
                </FieldComponent>
            );
        });

    const handleRenderFields = (key) => {
        if (key) {
            return handleRenderSelectedFields(fields[key]);
        }
        return handleRenderSelectedFields(fields);
    };

    const diffData = () => {
        console.log('diff', formData, fieldData);

        let diffed = shouldDiffRequest ? diff(formData, fieldData) : formData;

        if (Array.isArray(shouldDiffRequest)) {
            const undiffed = shouldDiffRequest.reduce(
                (acc, cur) => ({ ...acc, [cur]: formData[cur] }),
                {}
            );

            diffed = { ...diffed, ...undiffed };
        }

        return diffed;
    };

    const handleSubmit = async (onSubmit = () => null) => {
        setSubmitting(true);
        setErrors({});

        const diffedData = diffData();
        const [method, ...otherRemote] = remote;

        const parsedRemote = parseRemote(otherRemote);

        try {
            const response = await request(
                method,
                parsedRemote.alias,
                parsedRemote.params,
                ['postRaw', 'patchRaw'].indexOf(method) === -1
                    ? transformRequestData(diffedData, transformRequest)
                    : transformRequest(diffedData)
            );

            setSubmitting(false);

            if (shouldPublish) {
                PubSub.publish('@currentScene/SET_DATA', response.data);
            }

            onSubmit(response.data);
        } catch (err) {
            setSubmitting(false);

            if (!err.response) {
                console.error(err);
                return;
            }

            const {
                response: { status, data },
            } = err;

            if (status !== 422 || !data) {
                notifyError(
                    'Sorry, something appears to have gone wrong. Please contact the site administrator.'
                );
                return;
            }

            notifyError('Please double check the form and try again');

            if (err.response && err.response.data && err.response.data.errors) {
                setErrors(err.response.data.errors);
            }
        }
    };

    return {
        errors,
        handleFormData: setFormData,
        handleRenderFields,
        handleSubmit,
        pendingData: formData,
        isSubmitting,
    };
};

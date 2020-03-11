import React, { useState } from 'react';
import PubSub from 'pubsub-js';

import { diff, getFromObject, parseRemote } from 'nwiadmin/utility';

import { request } from 'nwiadmin/services/api';

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
            .reduce((acc, cur) => [...acc, ...cur], [])
            .map((field) => field.name)
            .filter((name) => name);
    }
    return fields.map((field) => field.name).filter((name) => name);
};

export const useForm = ({
    data = {},
    fields = [],
    remote = '',
    transformRequest = (d) => d,
    transformResponse = (d) => d,
    shouldDiffRequest = true,
    shouldPublish = true,
}) => {
    const fieldNames = getFieldNames(fields);
    const fieldData = getFromObject(transformResponse(data), fieldNames);

    const [formData, setFormData] = useFormData(fieldData);

    const [errors, setErrors] = useState({});
    const [isSubmitting, setSubmitting] = useState(false);

    const handleRenderSelectedFields = (selectedFields) =>
        selectedFields.map((field, index) => {
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
                        onChange={(event) => setFormData(field.name, event.target.value)}
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
                transformRequest(diffedData)
            );

            if (shouldPublish) {
                PubSub.publish('@currentScene/SET_DATA', response.data);
            }

            onSubmit(response.data);
        } catch (err) {
            setErrors(err.response && err.response.data ? err.response.data.errors : {});
        }

        setSubmitting(false);
    };

    return { isSubmitting, handleFormData: setFormData, handleRenderFields, handleSubmit };
};

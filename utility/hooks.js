import React, { useState } from 'react';

import { diff, getFromObject, parseRemote } from 'nwiadmin/utility';

import { request } from 'nwiadmin/services/api';

import { FormField, FormError, TextInput } from 'nwiadmin/components/form';

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

export const useForm = ({
    data = {},
    fields = [],
    remote = '',
    transformRequest = (d) => d,
    transformResponse = (d) => d,
}) => {
    const fieldNames = fields.map((field) => field.name).filter((name) => name);
    const fieldData = getFromObject(transformResponse(data), fieldNames);

    const [formData, setFormData] = useFormData(fieldData);

    const [errors, setErrors] = useState({});
    const [isSubmitting, setSubmitting] = useState(false);

    const handleRenderFields = () => {
        return fields.map((field, index) => {
            if (field === '-') {
                return <hr key={index} />;
            }

            const Component = field.component || TextInput;

            const hasError = Boolean(errors && errors[field.name]);
            const errorMessage = hasError ? errors[field.name][0] : '';

            return (
                <FormField key={field.name} name={field.name} label={field.label}>
                    <Component
                        {...(field.props || {})}
                        value={formData[field.name]}
                        onChange={(event) => setFormData(field.name, event.target.value)}
                        hasError={hasError}
                    />
                    {hasError && <FormError>{errorMessage}</FormError>}
                </FormField>
            );
        });
    };

    const handleSubmit = async (onSubmit = () => null) => {
        setSubmitting(true);
        setErrors({});

        const diffedData = diff(formData, fieldData) || {};
        const [method, ...otherRemote] = remote;

        const parsedRemote = parseRemote(otherRemote);

        try {
            const response = await request(
                method,
                parsedRemote.alias,
                parsedRemote.params,
                transformRequest(diffedData)
            );
            onSubmit(response);
        } catch (err) {
            setErrors(err.response && err.response.data ? err.response.data.errors : {});
        }

        setSubmitting(false);
    };

    return { isSubmitting, handleFormData: setFormData, handleRenderFields, handleSubmit };
};

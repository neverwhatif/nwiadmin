/* eslint-disable import/prefer-default-export */

import React from 'react';
import FormScene from 'nwiadmin/scenes/form';

import { logDeprecated } from 'nwiadmin/utility';

import { getFieldValue } from 'nwiadmin/services/form';
import { FormRow, FormField, FormDesc, FormError, TextInput } from '../index';

const renderField = (field, form, index) => {
    if (field === '-') {
        return <hr key={index} />;
    }
    if (!field.name && field.desc) {
        return (
            <FormDesc
                key={field.desc}
                isTitle={field.isTitle || false}
                isSubtle={field.isSubtle || false}
            >
                {field.desc}
            </FormDesc>
        );
    }

    const Component = field.component || TextInput;

    const { pendingData, errors } = form.state;

    const hasError = Boolean(errors && errors[field.name]);
    const errorMessage = hasError ? errors[field.name][0] : '';
    const otherProps = field.props || {};

    const onChange = (e) => {
        form.setInput(e);
        if (field.onChange) {
            field.onChange(e);
        }
        if (field.props && field.props.onChange) {
            field.props.onChange(e);
        }
    };

    const pendingValue = getFieldValue(field.name, pendingData);
    const value =
        typeof pendingValue === 'undefined' || pendingValue === null ? field.value : pendingValue;

    return (
        <FormField
            key={field.name || field.key}
            name={field.name}
            label={field.label}
            desc={field.desc}
        >
            <Component
                {...otherProps}
                name={field.name}
                value={value}
                onChange={(e) => onChange(e)}
                hasError={hasError}
            />
            {hasError && <FormError>{errorMessage}</FormError>}
        </FormField>
    );
};

const renderRow = (children, form, index) => (
    <FormRow key={children[0].name}>
        {children.map((field) => renderField(field, form, index))}
    </FormRow>
);

const renderRowOrField = (field, form, index) =>
    field.children ? renderRow(field.children, form, index) : renderField(field, form, index);

export const renderFields = (fieldData, form) => {
    logDeprecated('renderFields');

    if (!(form instanceof FormScene)) {
        throw new Error(
            '[Form Helper] renderFields can only be called from within a FormScene class'
        );
    }
    return fieldData
        ? fieldData
              .filter((field) => field !== null)
              .map((field, index) => renderRowOrField(field, form, index))
        : null;
};

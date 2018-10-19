import React, { Fragment } from 'react';

export const formatStyle = (input) => {
    const match = `${input}`.match(/^\[([^]+)\]:(.+)/);

    if(!match) {
        return input;
    }
    const [total, style, text] = match;
    return [style, text];
};

const Styled = ({ data }) => {
    const formatted = formatStyle(data);

    return Array.isArray(formatted) ? (
        <span className={`clr-${formatted[0]}`}>{formatted[1]}</span>
    ) : (
        <Fragment>{formatted}</Fragment>
    );
};

export default Styled;

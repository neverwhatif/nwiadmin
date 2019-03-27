/* eslint-disable import/prefer-default-export */

import config from 'app/config';

let elements = {};

export const setDocumentTitle = (title) => {
    document.title = title ? `${title} | ${config.app.name}` : config.app.name;
};

export const registerElement = (key, element) => {
    elements[key] = element;
};

export const getElement = (key) => elements[key];

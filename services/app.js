/* eslint-disable import/prefer-default-export */

import config from 'app/config';

export const setDocumentTitle = (title) => {
    document.title = title ? `${title} | ${config.app.name}` : config.app.name;
};

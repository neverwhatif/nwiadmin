/* eslint-disable camelcase */

import { parseSearch, stringifySearch } from 'nwiadmin/utility';

const getLinkUrl = (location, page) => {
    if (!location.search) {
        return `${location.pathname}?page=${page}`;
    }

    const parsedSearch = parseSearch(location.search);
    parsedSearch.page = page;

    return `${location.pathname}?${stringifySearch(parsedSearch)}`;
};

const getLink = (label, isCurrent, location) => ({
    type: 'link',
    to: getLinkUrl(location, label),
    label,
    isCurrent,
});

export const getPagination = (data, location) => {
    const { last_page, current_page } = data;

    // If the total number of pages is 1, return empty array
    if (last_page === 1) {
        return [];
    }

    let i = 1;
    const j = last_page;
    const pagination = [];

    for (; i <= j; i += 1) {
        if (i === 1 || i === j) {
            // First and last
            pagination.push(getLink(i, i === current_page, location));
        } else if (i === current_page) {
            // Current
            pagination.push(getLink(i, true, location));
        } else if ((i > 1 && i === current_page - 1) || (i < last_page && i === current_page + 1)) {
            // Adjacent to current
            pagination.push(getLink(i, false, location));
        }
    }

    // Add ellipses

    return pagination.reduce((acc, cur, index) => {
        acc.push(cur);

        if (pagination[index + 1] && pagination[index + 1].label !== cur.label + 1) {
            acc.push({
                type: 'ellipsis',
            });
        }

        return acc;
    }, []);
};

export const getPaginationSummary = (data) => {
    const { from, to, total } = data;
    return {
        from,
        to,
        total,
    };
};

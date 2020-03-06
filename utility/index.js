import qs from 'qs';

export { default as diff } from './diff';
export { default as flatten } from './flatten';

export const parseSearch = (search) => qs.parse(search.replace(/^\?/, ''));
export const stringifySearch = (search) => qs.stringify(search);

export const ucwords = (str, force = false) =>
    (force ? str.toLowerCase(str) : str).replace(/^(.)|\s+(.)/gu, ($1) => $1.toUpperCase());

export const isPromise = (value) =>
    value !== null && typeof value === 'object' && typeof value.then === 'function';

export const onAccessibleKeyDown = (e, fn) => (e.keyCode === 13 ? fn() : null);

export const unique = (arr) => arr.reduce((x, y) => (x.includes(y) ? x : [...x, y]), []);

export const toggleArrayItem = (array, item) => {
    const index = array.indexOf(item);

    return index > -1 ? array.filter((i) => i !== item) : [...array, item];
};

export const toggleArrayObject = (array, item, key = 'id') => {
    const { length } = array;
    const filtered = array.filter((fitem) => fitem[key] !== item[key]);

    if (filtered.length !== length) {
        return filtered;
    }

    return [...array, item];
};

export const addPrefixToClassNames = (styles, prefix, classes = []) => {
    if (classes === null) {
        return [styles[prefix]];
    }

    const classArray = Array.isArray(classes) ? classes : classes.split(' ');
    const allClasses = [...classArray, ''];

    return unique(allClasses)
        .map((item) => styles[`${prefix}${ucwords(item)}`])
        .filter((item) => typeof item !== 'undefined');
};

export const parseRemote = (remote, search = '') => {
    const parsedSearch = parseSearch(search);

    if (Array.isArray(remote)) {
        const ret = {
            alias: remote[0],
            params: {
                ...remote[1],
                ...parsedSearch,
            },
        };

        if (remote[1].filter || parsedSearch.filter) {
            ret.params.filter = {
                ...remote[1].filter,
                ...parsedSearch.filter,
            };
        }

        return ret;
    }

    return {
        alias: remote,
        params: parsedSearch,
    };
};

export const stringifyRemote = (data) => {
    if (!Array.isArray(data)) {
        return data;
    }

    const [alias, params] = data;
    return `${alias}${Object.keys(params).length ? `?${qs.stringify(params)}` : ''}`;
};

export const getFromObject = (data, keys) =>
    keys.reduce(
        (acc, cur) => (typeof data[cur] === 'undefined' ? acc : { ...acc, [cur]: data[cur] }),
        {}
    );

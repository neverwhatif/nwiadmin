import { format } from 'nwiadmin/utility/formatters';

export const formatReference = (title, reference, link) => ({
    title,
    reference,
    link,
    type: 'reference',
});

export const formatLink = (title, path, isExternal = false) => ({
    title,
    path,
    isExternal,
    type: 'link',
});

export const formatDetails = (title, details) => ({
    title,
    details,
    type: 'details',
});

export const convertDataToLandscape = (data, columns) => (data ? Object.entries(data).map((item, index) => ({
    $id: index,
    metric: columns.filter(col => col.key === item[0])[0].title,
    value: format(item[1], columns.filter(col => col.key === item[0])[0].type),
})) : null);

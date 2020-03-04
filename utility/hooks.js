import { useState } from 'react';

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

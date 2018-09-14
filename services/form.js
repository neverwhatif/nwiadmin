export const getFieldValue = (name, data) => (name ? name.split('.').reduce((acc, cur) => acc[cur], data) : null);

export const setUpdatedData = (name, value, data) => {
    const newData = { ...data };
    const parts = name.split(/\.(?=[^.]+$)/);

    if (parts.length === 1) {
        newData[parts[0]] = value;
        return newData;
    }

    getFieldValue(parts[0], newData)[parts[1]] = value;

    return newData;
};

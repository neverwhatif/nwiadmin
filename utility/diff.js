const isValue = obj => obj === null || (typeof obj !== 'object' && !Array.isArray(obj));

const compare = (value1, value2) => (
    value1 !== value2 && typeof value1 !== 'undefined' && typeof value1 !== 'undefined'
);

const diff = (obj1, obj2) => {
    if (isValue(obj1) || isValue(obj2)) {
        const isDifferent = compare(obj1, obj2);

        if (!isDifferent) {
            return null;
        }
        return (obj1 === undefined) ? obj2 : obj1;
    }

    const objDiff = {};
    let shouldRemove = true;

    Object.keys(obj1 || {}).forEach((key) => {
        const cur = diff(obj1[key], obj2[key]);


        if (cur !== null) {
            objDiff[key] = cur;
            shouldRemove = false;
        }
    });

    Object.keys(obj2 || {}).forEach((key) => {
        if (typeof objDiff[key] !== 'undefined') {
            return;
        }

        const cur = diff(undefined, obj2[key]);

        if (cur !== null) {
            objDiff[key] = cur;
            shouldRemove = false;
        }
    });

    return shouldRemove ? null : objDiff;
};


export default diff;

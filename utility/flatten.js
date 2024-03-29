const flatten = (target, opts = {}) => {
    const delimiter = opts.delimiter || '][';
    const maxDepth = opts.maxDepth;
    const output = {};

    const step = (object, prev, currentDepth = 1) => {
        Object.keys(object).forEach(function (key) {
            const value = object[key];
            const isarray = opts.safe && Array.isArray(value);
            const type = Object.prototype.toString.call(value);
            const isobject = (type === '[object Object]' || type === '[object Array]');

            const newKey = prev ? prev + delimiter + key : key;

            if (!isarray && isobject && Object.keys(value).length && (!opts.maxDepth || currentDepth < maxDepth)) {
                return step(value, newKey, currentDepth + 1);
            }

            output[`[${newKey}]`.replace(/\[([^\]]+)\]/, "$1")] = value;
        });
    }

    step(target);
    return output;
};

export default flatten;

let jwt = 'jwt';

module.exports = {
    getItem: () => jwt,
    setItem: (key, value) => `${key}:${value}`,
    removeItem: () => null,
    mockUnsetItem: () => {
        jwt = undefined;
    },
    mockResetItem: () => {
        jwt = 'jwt';
    },
};

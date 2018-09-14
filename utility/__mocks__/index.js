module.exports = {
    onAccessibleKeyDown: fn => fn(),
    parseRemote: () => ({
        alias: 'lorem',
        params: { lorem: 'ipsum' },
    }),
    parseSearch: () => ({ lorem: 'ipsum' }),
};

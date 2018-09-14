let resolveOrReject = true;

module.exports = {
    get: () => new Promise((resolve, reject) => {
        if (resolveOrReject) {
            resolve({ data: [{ id: 1, name: 'Lorem' }] });
        } else {
            reject();
        }
        resolveOrReject = !resolveOrReject;
    }),
    mockReset: () => {
        resolveOrReject = true;
    },
};

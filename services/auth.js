import store from 'nwiadmin/utility/store';

const tokenName = 'token';
const authRouteName = 'login';

export const getToken = () => (store.getItem(tokenName) || '').replace(/\n/, '');
export const setToken = token => store.setItem(tokenName, token);
export const removeToken = () => store.removeItem(tokenName);

export const setTokenFromHeader = (headers = {}) => {
    const header = headers.authorization || headers.Authorization;

    if (header) {
        const token = header.replace(/^Bearer /, '');
        return setToken(token);
    }

    return null;
};

const getHeader = () => ({
    Authorization: `Bearer ${getToken()}`,
});

export const getAuthedHeaders = (headers = {}) => ({
    ...headers,
    ...getHeader(),
});

const handleUnauth = (history) => {
    removeToken();

    if (window.location.pathname === `/${authRouteName}`) {
        return;
    }

    const { pathname, search } = window.location;
    history.push(`/${authRouteName}`, { redirect: `${pathname}${search}` });
};

const checkForUnauthResponse = (error) => {
    if(!error.response) {
        console.log(error);
        return;
    }
    if (error.response.status === 401) {
        return true;
    }
    if (error.response.status === 400
        && error.response.data.error
        && error.response.data.error.match(/token/)
    ) {
        return true;
    }

    return false;
};

export const checkAuthResponse = (error, history, elseFn) => {
    // A bit hacky, probably should use some way of passing a 'isUnauth' parameter to the route or something
    if (history.location.pathname.match(/^\/reset/)) {
        return;
    }

    if (checkForUnauthResponse(error)) {
        handleUnauth(history);
        return;
    }

    if (elseFn && typeof elseFn === 'function') {
        elseFn();
    }
};

export const login = (token, redirect = '/') => {
    setToken(token);
    window.location = redirect;
};

export const logout = () => {
    removeToken();
    window.location = `/${authRouteName}`;
};

import axios from 'axios';
import qs from 'qs';

import config from 'app/config';
import { getAuthedHeaders, setTokenFromHeader } from './auth';

let responseTransformer = response => response;
let isRegistered = false;

export const registerAPI = (opts = {}) => {
    if (isRegistered) {
        console.error('API has already been registered');
        return;
    }

    if (opts.transformResponse) {
        responseTransformer = opts.transformResponse;
    }
    isRegistered = true;
};

const cancels = {};

const defaultOptions = {
    cancellable: false,
    headers: {},
};

const responseSuccess = (response) => {
    const transformed = responseTransformer(response);

    setTokenFromHeader(transformed.headers);
    return transformed.data;
};

const responseError = (error) => {
    if (axios.isCancel(error)) {
        return Promise.resolve(-1);
    }
    setTokenFromHeader(error.response ? error.response.headers : {});
    return Promise.reject(error);
};

const transformRequestToRaw = (requestObj, method) => {
    const fd = new FormData();
    const newRequestObj = { ...requestObj };

    Object.entries(requestObj.data).forEach((item) => {
        fd.append(item[0], item[1]);
    });

    if (method === 'patchraw') {
        fd.append('_method', 'patch');
    }

    newRequestObj.method = 'post';
    newRequestObj.data = fd;
    newRequestObj.headers['Content-Type'] = undefined;

    newRequestObj.transformRequest = $ => $;

    return newRequestObj;
};

export const makeUrl = (alias, params = {}) => `${config.paths.api}/${alias}${Object.keys(params).length
    ? `?${qs.stringify(params)}`
    : ''}`;

const createRequestConfig = (rawMethod, alias, params = {}, rawData = {}, rawOptions = {}) => {
    let method = rawMethod || 'post';

    const lowerMethod = method.toLowerCase();
    const data = { ...rawData };

    if (lowerMethod === 'delete' || lowerMethod === 'patch') {
        method = 'post';
        data._method = lowerMethod; // eslint-disable-line no-underscore-dangle
    }

    const options = {
        ...defaultOptions,
        ...rawOptions,
    };

    if (cancels[alias]) {
        cancels[alias].cancel();
    }

    const headers = getAuthedHeaders({
        ...options.headers,
        Accept: 'application/json',
    });

    let requestConfig = {
        headers,
        method,
        url: makeUrl(alias, params),
    };

    if (data) {
        requestConfig.data = data;
    }

    if (options.cancellable) {
        const { CancelToken } = axios;

        cancels[alias] = CancelToken.source();
        requestConfig.cancelToken = cancels[alias].token;
    }

    if (lowerMethod === 'postraw' || lowerMethod === 'patchraw') {
        requestConfig = transformRequestToRaw(requestConfig, lowerMethod);
    }

    return requestConfig;
};

export const request = (method, alias, params, data, options) => {
    const requestConfig = createRequestConfig(method, alias, params, data, options);
    return axios.request(requestConfig)
        .then(response => responseSuccess(response))
        .catch(error => responseError(error));
};

export const get = (alias, params, options) => request('get', alias, params, false, options);

export const post = (alias, params, data, options) => request('post', alias, params, data, options);
export const postRaw = (alias, params, data, options) => request('postraw', alias, params, data, options);

export const patch = (alias, params, data, options) => request('patch', alias, params, data, options);
export const patchRaw = (alias, params, data, options) => request('patchraw', alias, params, data, options);

export const apiDelete = (alias, params, data) => request('delete', alias, params, data);

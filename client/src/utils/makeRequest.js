const DefaultHeaders = {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
};

const makeRequest = (path, method, payload, headers = DefaultHeaders) => {
    console.log('[makeRequest]', path, method, (payload || ''));
    const options = {
        method: method,
        headers: headers,
        credentials: 'include'
    };

    if (payload) options.body = JSON.stringify(payload);

    return fetch(path, options);
};

export default makeRequest;
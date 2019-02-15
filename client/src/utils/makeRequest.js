const DefaultHeaders = {
  Accept: 'application/json, text/plain, */*',
  'Content-Type': 'application/json'
};

const makeRequest = (
  path,
  method = 'GET',
  payload,
  headers = DefaultHeaders
) => {
  const options = {
    method,
    headers,
    credentials: 'include'
  };

  if (payload) options.body = JSON.stringify(payload);
  console.log('[makeRequest]', path, method, payload || '')
  return fetch(path, options);
};

export default makeRequest;

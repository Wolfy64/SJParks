/*jshint esversion: 8 */
const DefaultHeaders = {
  Accept: 'application/json, text/plain, */*',
  'Content-Type': 'application/json'
};

const makeRequest = (
  path,
  method = 'GET',
  payload = null,
  headers = DefaultHeaders
) => {
  // Request with GET/HEAD method cannot have body
  const options = {
    method,
    headers,
    credentials: 'include'
  };

  // All Requests except GET/HEAD method will have a JSON payload as body
  if (payload) options.body = JSON.stringify(payload);
  return fetch(path, options);
};

export default makeRequest;

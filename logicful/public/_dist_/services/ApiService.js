import {getToken} from "./AuthService.js";
function instance() {
  return fetch;
}
function authHeaders() {
  const token = getToken();
  if (!token) {
    return;
  }
  return {
    Authorization: "Bearer " + token
  };
}
export function apiEndpoint() {
  return "http://localhost:3000/api/";
}
export async function getApi(path) {
  const endpoint = apiEndpoint();
  const response = await instance()(`${endpoint}${path}`, {
    headers: authHeaders()
  });
  if (!response.ok) {
    const body2 = await response.json();
    throw new Error(body2.message);
  }
  const body = await response.json();
  return body;
}
export async function postApi(path, body) {
  return await requestApiWithBody("POST", path, body);
}
export async function putApi(path, body) {
  return await requestApiWithBody("PUT", path, body);
}
export async function deleteApi(path, body) {
  return await requestApiWithBody("DELETE", path, body);
}
async function requestApiWithBody(method, path, body) {
  const endpoint = apiEndpoint();
  try {
    const response = await instance()(`${endpoint}${path}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...authHeaders()
      },
      body: JSON.stringify(body)
    });
    console.log(response);
    if (!response.ok) {
      const body2 = await response.json();
      throw new Error(body2.message);
    }
    const result = await response.text();
    if (result === null || result === "") {
      return {};
    }
    return JSON.parse(result);
  } catch (ex) {
    throw ex;
    return {};
  }
}

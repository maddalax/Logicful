import { a7 as __awaiter, a9 as config } from './client.a93cf518.js';

function instance() {
    //@ts-ignore
    return fetch !== null && fetch !== void 0 ? fetch : this.fetch;
}
function apiEndpoint() {
    return config["API_ENDPOINT"];
}
function getApi(path) {
    return __awaiter(this, void 0, void 0, function* () {
        const endpoint = apiEndpoint();
        const response = yield instance()(`${endpoint}${path}`);
        if (!response.ok) {
            const body = yield response.json();
            throw new Error(body.message);
        }
        const body = yield response.json();
        return body;
    });
}
function postApi(path, body) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield requestApiWithBody("POST", path, body);
    });
}
function putApi(path, body) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield requestApiWithBody("PUT", path, body);
    });
}
function deleteApi(path, body) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield requestApiWithBody("DELETE", path, body);
    });
}
function requestApiWithBody(method, path, body) {
    return __awaiter(this, void 0, void 0, function* () {
        const endpoint = apiEndpoint();
        const response = yield instance()(`${endpoint}${path}`, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        if (!response.ok) {
            const body = yield response.json();
            throw new Error(body.message);
        }
        const result = yield response.text();
        if (result === null || result === '') {
            return {};
        }
        return JSON.parse(result);
    });
}

export { postApi as a, apiEndpoint as b, deleteApi as d, getApi as g, putApi as p };

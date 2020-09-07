import type { User } from "models/User";

let memoryToken: string = ''

export interface UserToken {
    token: string
    expiration: number
}

export function setToken(token: UserToken, remember: boolean = true) {
    localStorage.removeItem("token");
    if (remember) {
        localStorage.setItem("token", JSON.stringify(token))
    } else {
        memoryToken = JSON.stringify(token)
    }
}

export function getToken(): string | undefined {
    const token = localStorage.getItem("token") ?? memoryToken;
    if (!token) {
        return undefined
    }
    try {
        const parsed: UserToken = JSON.parse(token);
        return parsed.token;
    } catch (ex) {
        localStorage.removeItem("token")
        memoryToken = ''
        return undefined;
    }
}

export function me(): User {
    const emptyUser = {
        fullName: '',
        displayName: '',
        email: '',
        id: '',
        teamId: ''
    }
    const token = getToken();
    if(!token) {
        return emptyUser;
    }
    try {
        const user: User = parseJwt(token);
        return user
    } catch {
        return emptyUser;
    }
}

function parseJwt(token: string): any {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
};

export function refreshToken() {

}
import type { User } from "models/User";

let memoryToken : string = ''

export interface UserToken {
    token: string
    expiration: number
}

export function setToken(token: UserToken, remember : boolean = true) {
    localStorage.removeItem("token");
    if(remember) {
        localStorage.setItem("token", JSON.stringify(token))
    } else {
        memoryToken = JSON.stringify(token)
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
    const token = localStorage.getItem("token") ?? memoryToken;
    if (!token) {
        return emptyUser
    }
    try {
        const parsed: UserToken = JSON.parse(token);
        const user: User = parseJwt(parsed.token);
        console.log(user);
        return user;
    } catch (ex) {
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
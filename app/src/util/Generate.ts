export function randomStringSmall() {
    return Math.random().toString(36).substring(2, 3) + Math.random().toString(36).substring(2, 5)
}

export function randomString() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}
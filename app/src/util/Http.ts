export function getUrlParameter(name, url? : string) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    let results = regex.exec(url ?? location.search);
    return results === null ? undefined : decodeURIComponent(results[1].replace(/\+/g, ' '));
}
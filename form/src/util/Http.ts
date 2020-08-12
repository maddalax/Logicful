export function getUrlParameter(name, url? : string) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(url ?? location.search);
    return results === null ? undefined : decodeURIComponent(results[1].replace(/\+/g, ' '));
};
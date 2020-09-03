function getUrlParameter(name, url) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    let results = regex.exec(url !== null && url !== void 0 ? url : location.search);
    return results === null ? undefined : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

export { getUrlParameter as g };

export function getUrlParameter(name, url) {
  if (!location) {
    return void 0;
  }
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  let regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  let results = regex.exec(url ?? location.search);
  const result = results === null ? void 0 : decodeURIComponent(results[1].replace(/\+/g, " "));
  if (result === "undefined" || result === "" || result === "null") {
    return void 0;
  }
  return result;
}

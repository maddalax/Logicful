export function getUrlParameter(name: string, url?: string) {
  if (!location) {
    return undefined
  }
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]')
  let regex = new RegExp('[\\?&]' + name + '=([^&#]*)')
  let results = regex.exec(url ?? location.search)
  return results === null ? undefined : decodeURIComponent(results[1].replace(/\+/g, ' '))
}

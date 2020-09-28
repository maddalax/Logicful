export function shiftArray(arr, oldIndex, newIndex) {
  if (newIndex >= arr.length) {
    let k = newIndex - arr.length + 1;
    while (k--) {
      arr.push(void 0);
    }
  }
  arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0]);
  return arr;
}
export function orderBy(arr, arr2, property) {
  arr.sort((a, b) => {
    return arr2.indexOf(a[property]) - arr2.indexOf(b[property]);
  });
  return arr;
}

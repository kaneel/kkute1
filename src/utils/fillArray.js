export function fillArray(arr, value, till) {
  const nuArray = new Array(10).fill(value)

  return nuArray.map((value, i) => (typeof arr[i] !== 'undefined' ? arr[i] : value))
}

export const bitpad = value => {
  const len = value.length
  const padlen = 7 - len
  let str = ''
  for (var i = 0; i < padlen; i++) str += '0'
  return `${str}${value}`
}

const toLowerCase = String.prototype.toLowerCase

const specials = [' ', '!', '"', '#', '$', '%', '&', "'", '(', ')', '*', '+', ',', '-', '.', '/']
const specials2 = [':', ';', '<', '=', '>', '?', '@']
const specials3 = ['[', '¥', ']', '^', '_', '`']
const specials4 = ['{', '|', '}', '→', '←']

const numbers = Array.from(new Array(10), (_, i) => i.toString())
const alphabetUpper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
const alphabetLower = alphabetUpper.map(item => toLowerCase.call(item))

const allChars = specials
  .concat(numbers)
  .concat(specials2)
  .concat(alphabetUpper)
  .concat(specials3)
  .concat(alphabetLower)
  .concat(specials4)

export default allChars

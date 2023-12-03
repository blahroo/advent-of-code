
const DIGIT_STRINGS: ReadonlySet<string> = new Set(['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']);

export const isDigit = (maybe: string) => {
  if (typeof maybe !== 'string') {
    throw new Error(`expected a string. Received type ${typeof maybe}`)
  }

  if (maybe.length !== 1) {
    throw new Error(`expected a single character to check if it is a digit. Received "${maybe}"`);
  }

  return DIGIT_STRINGS.has(maybe);
}

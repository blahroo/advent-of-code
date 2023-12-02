import { INPUT } from "./input"

const DIGIT_STRINGS: ReadonlySet<string> = new Set(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']);

const lines = INPUT.split('\n');
const summed = lines.reduce((runningTotal, line) => {
  const characters = line.split('');
  const leftMost = characters.find(character => DIGIT_STRINGS.has(character));
  characters.reverse();
  const rightMost = characters.find(character => DIGIT_STRINGS.has(character));

  return runningTotal + Number(`${leftMost}${rightMost}`);
}, 0);

console.log({ summed });
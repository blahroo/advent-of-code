import { INPUT } from "./input";

const ORIGINAL_LINES = INPUT.split("\n");

console.log(ORIGINAL_LINES);
const r = /\d/;
const s = /(\d)(?!.*\d)/;
let output = 0;

for (let i = 0; i < ORIGINAL_LINES.length; i++) {
  let firstDigit = ORIGINAL_LINES[i].match(r)[0];
  let secondDigit = ORIGINAL_LINES[i].match(s)[0];
  let finalNumber = parseInt(firstDigit + secondDigit);

  output += finalNumber;
}

console.log(output);

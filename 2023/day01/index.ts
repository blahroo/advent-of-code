import { INPUT } from "./input";

const ORIGINAL_LINES = INPUT.split("\n");
const r = /\d/;
const s = /(\d)(?!.*\d)/;
let output = 0;
let newLines = [];

const dictionary = {
  one: "one1one",
  two: "two2two",
  three: "three3three",
  four: "four4four",
  five: "five5five",
  six: "six6six",
  seven: "seven7seven",
  eight: "eight8eight",
  nine: "nine9nine",
};

for (let i = 0; i < ORIGINAL_LINES.length; i++) {
  let newLine = ORIGINAL_LINES[i];
  for (const key in dictionary) {
    newLine = newLine.replaceAll(key.toString(), dictionary[key]);
  }
  newLines.push(newLine);
}

for (let i = 0; i < newLines.length; i++) {
  let firstDigit = newLines[i].match(r)[0];
  let secondDigit = newLines[i].match(s)[0];
  let finalNumber = parseInt(firstDigit + secondDigit);

  output += finalNumber;
}

console.log(output);

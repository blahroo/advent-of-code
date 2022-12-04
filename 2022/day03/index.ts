import { Day03Input } from "./input";

const findItemInBothCompartments = (line: string) => {
  const characters = line.split("");
  const mid = characters.length / 2;

  const compartmentB = characters.splice(mid, mid);
  const compartmentA = characters;

  const ret = compartmentA.find((thisItem) => {
    return compartmentB.includes(thisItem);
  });

  if (!ret) {
    throw new Error(`No item in common ${line}`);
  }

  return ret;
};

const LOWER_CASE_ALPHABET = "abcdefghijklmnopqrstuvwxyz".split("");
const UPPER_CASE_ALPHABET = LOWER_CASE_ALPHABET.map((a) => a.toUpperCase());

const getItemPriority = (char: string) => {
  if (char.length !== 1) {
    throw new Error(`Expected single character, received ${char}`);
  }

  const lowerIndex = LOWER_CASE_ALPHABET.indexOf(char);
  if (lowerIndex !== -1) {
    return lowerIndex + 1;
  }

  const upperIndex = UPPER_CASE_ALPHABET.indexOf(char);
  if (lowerIndex !== -1) {
    throw new Error(`Unknown character ${char}`);
  }

  return upperIndex + 27;
};

let totalPriorities = 0;

for (const line of Day03Input) {
  const dupe = findItemInBothCompartments(line);
  const priority = getItemPriority(dupe);

  totalPriorities += priority;
}

console.log({
  totalPriorities,
});

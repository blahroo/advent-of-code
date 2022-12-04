import { Day03Input } from "./input";

const LOWER_CASE_ALPHABET = "abcdefghijklmnopqrstuvwxyz".split("");
const UPPER_CASE_ALPHABET = LOWER_CASE_ALPHABET.map((a) => a.toUpperCase());

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

let totalPrioritiesPart1 = 0;

for (const line of Day03Input) {
  const dupe = findItemInBothCompartments(line);
  const priority = getItemPriority(dupe);

  totalPrioritiesPart1 += priority;
}

const findCommonInAll = (a: string, b: string, c: string) => {
  const elf1 = new Set(a.split(""));
  const elf2 = new Set(b.split(""));
  const elf3 = new Set(c.split(""));

  for (const item of elf1) {
    if (elf2.has(item) && elf3.has(item)) {
      return item;
    }
  }

  throw new Error("Did not find a common item");
};

let totalPrioritiesPart2 = 0;
for (let groupNo = 0; groupNo < Day03Input.length / 3; ++groupNo) {
  const offset = groupNo * 3;
  const elf1 = Day03Input[offset];
  const elf2 = Day03Input[offset + 1];
  const elf3 = Day03Input[offset + 2];
  const commonItem = findCommonInAll(elf1, elf2, elf3);
  totalPrioritiesPart2 += getItemPriority(commonItem);
}

console.log({
  totalPrioritiesPart1,
  totalPrioritiesPart2,
});

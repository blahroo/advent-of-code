import { Day05Input } from "./input";
import { Stack } from "@datastructures-js/stack";

import _times from "lodash/times";

export {};

const firstMoveIndex = Day05Input.findIndex((line) => line.startsWith("move "));

const formationLines = Day05Input.slice(0, firstMoveIndex - 2); // Minus empty line plus the x-axis lint
const formationLinesReverse = formationLines.reverse();
const instructions = Day05Input.slice(firstMoveIndex);

// We won't use index 0 but it's easier to waste it's spot than offset everywhere
const stacks = _times(10).map(() => new Stack<string>());

for (const line of formationLinesReverse) {
  let offset = 1;
  for (let i = 1; i <= 9; ++i) {
    const thisChar = line.charAt(offset);

    if (thisChar.trimRight() !== "") {
      stacks[i].push(thisChar);
    }

    offset += 4;
  }
}

for (const instruction of instructions) {
  const parts = instruction.split(" ");
  const total = Number(parts[1]);
  const source = Number(parts[3]);
  const destination = Number(parts[5]);

  for (let i = 0; i < total; ++i) {
    stacks[destination].push(stacks[source].pop());
  }
}

const part1 = stacks
  .map((stack) => stack.peek())
  .join("")
  .trimLeft();
console.log({ part1 });

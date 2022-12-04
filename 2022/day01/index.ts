import { Day01Input } from "./input";

const totals: number[] = [];
let runningTotal = 0;

for (const line of Day01Input) {
  if (line.length === 0) {
    totals.push(runningTotal);
    runningTotal = 0;
  } else {
    runningTotal += Number(line);
  }
}

totals.sort((a, b) => b - a);

console.log({
  largestTotal: totals[0],
  topThree: totals[0] + totals[1] + totals[2],
});

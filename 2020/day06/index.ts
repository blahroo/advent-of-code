const rawInput: string = require('fs')
    .readFileSync('2020/day06/input.txt')
    .toString()
    .replace(/[\r]/g, '');
const rows = rawInput.split("\n");
rows.push("");

let runningTotal = 0;
let currentGroupAnswered: Set<string> = new Set();

for (let row of rows) {
    if (row.length === 0) {
        runningTotal += currentGroupAnswered.size;
        currentGroupAnswered = new Set();
    } else {
        const answers = row.split("");
        answers.forEach(answer => currentGroupAnswered.add(answer));
    }
}

console.log("Part 1 = " + runningTotal);

export {};

const rawInput: string = require('fs')
    .readFileSync('2020/day06/input.txt')
    .toString()
    .replace(/[\r]/g, '');
const rows = rawInput.split("\n");
rows.push("");

let runningTotalGroupAnswered = 0;
let runningTotalGroupAnsweredByEveryone = 0;
let currentGroupAnswered: Set<string> = new Set();
let currentGroupAnsweredByEveryone: Set<string> | null = null;

for (let row of rows) {
    if (row.length === 0) {
        runningTotalGroupAnswered += currentGroupAnswered.size;
        currentGroupAnswered = new Set();

        if (currentGroupAnsweredByEveryone !== null) {
            runningTotalGroupAnsweredByEveryone += currentGroupAnsweredByEveryone.size;
            currentGroupAnsweredByEveryone = null;
        }
    } else {
        const answers = row.split("");

        answers.forEach(answer => currentGroupAnswered.add(answer));

        if (currentGroupAnsweredByEveryone === null) {
            currentGroupAnsweredByEveryone = new Set(answers);
        } else {
            const currentAnswers = new Set(answers);

            Array.from(currentGroupAnsweredByEveryone.values())
                .forEach(answer => {
                    if (!currentAnswers.has(answer)) {
                        currentGroupAnsweredByEveryone.delete(answer);
                    }
                });
        }
    }
}

console.log("Part 1 = " + runningTotalGroupAnswered);
console.log("Part 2 = " + runningTotalGroupAnsweredByEveryone);

export {};

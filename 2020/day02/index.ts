const rawInput: string = require('fs')
    .readFileSync('2020/day02/input.txt')
    .toString()

const rows = rawInput.split("\n");

function countUsesOfLetter(password: string, letter: string) {
    let uses = 0;

    password.split("").forEach(passwordLetter => {
        if (passwordLetter === letter) {
            ++uses;
        }
    });

    return uses;
}

function isValidRowPartOne(row: string) {
    const [rules, password] = row.split(": ");
    const [rangeConfig, wantedLetter] = rules.split(" ");
    const [minRequired, maxRequired] = rangeConfig.split("-").map(Number);
    const usesInPassword = countUsesOfLetter(password, wantedLetter);
    return usesInPassword >= minRequired && usesInPassword <= maxRequired;
}

const validRowsPart1 = rows.filter(isValidRowPartOne);
console.log("there are " + validRowsPart1.length + " valid rows for part 1");

function isValidRowPartTwo(row: string) {
    const [rules, password] = row.split(": ");
    const [rangeConfig, wantedLetter] = rules.split(" ");
    const [positionA, positionB] = rangeConfig.split("-")
        .map(n => Number(n))
        .map(n => n - 1);

    const containedAtA = password.charAt(positionA) === wantedLetter;
    const containedAtB = password.charAt(positionB) === wantedLetter;

    return (containedAtA) ? !containedAtB : containedAtB;
}

const validRowsPart2 = rows.filter(isValidRowPartTwo);
console.log("there are " + validRowsPart2.length + " valid rows for part 2");

export {};

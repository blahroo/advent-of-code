const rawInput: string = require('fs')
    .readFileSync('2020/day04/input.txt')
    .toString();

const rawRows = rawInput.split("\n");
rawRows.push("\n"); // passport is only comited on a newline, need one for the last passport

type Passport = Map<string, string>;

function isValidPassport(passport: Passport) {
    if (passport.size === 8) {
        return true;
    }

    if (passport.size === 7) {
        return !passport.has("cid");
    }

    return false;
}

const validPassports = new Set<Passport>();
const passports: Passport[] = [];
let currentPassport: Passport = new Map();

for (let row of rawRows) {
    if (row.length > 1) {
        const pairs = row.split(" ");
        pairs.forEach(pair => {
            const [key, value] = pair.split(":");
            currentPassport.set(key, value);
        });
    } else {
        if (isValidPassport(currentPassport)) {
            validPassports.add(currentPassport);
        }

        passports.push(currentPassport);
        currentPassport = new Map();
    }
}

// 260
console.log("Part1 There are " + validPassports.size + " valid rows")

export {};

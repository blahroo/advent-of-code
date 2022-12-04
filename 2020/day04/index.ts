const rawInput: string = require('fs')
    .readFileSync('2020/day04/input.txt')
    .toString()
    .replace(/[\r]/g, '');

const rawRows = rawInput.split("\n");
rawRows.push("\n"); // passport is only committed on a newline, need one for the last passport

type Passport = Map<string, string>;

function isValidPart1Passport(passport: Passport) {
    if (passport.size === 8) {
        return true;
    }

    return (passport.size === 7) ? !passport.has("cid") : false;
}

function isNumberBetween(maybeNumber: string, minimumInclusive: number, maximumInclusive: number) {
    const year = Number(maybeNumber);
    return year >= minimumInclusive && year <= maximumInclusive;
}

function hasValidBirthYear(passport: Passport) {
    return isNumberBetween(passport.get("byr"), 1920, 2002);
}

function hasValidIssueYear(passport: Passport) {
    return isNumberBetween(passport.get("iyr"), 2010, 2020);
}

function hasValidExpirationYear(passport: Passport) {
    return isNumberBetween(passport.get("eyr"), 2020, 2030);
}

function hasValidHeight(passport: Passport) {
    const rawHeight = passport.get("hgt");
    if (rawHeight.endsWith("cm")) {
        const [without] = rawHeight.split("cm");
        return isNumberBetween(without, 150, 193);
    } else if (rawHeight.endsWith("in")) {
        const [without] = rawHeight.split("in");
        return isNumberBetween(without, 59, 76);
    }

    return false;
}

const validHexCharacters = new Set(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"]);

function hasValidHairColor(passport: Passport) {
    const rawColor = passport.get("hcl");

    const parts = rawColor.split("#");
    if (parts.length !== 2 || parts[1].length !== 6) {
        return false;
    }

    const characters = parts[1].split("");
    return characters.every(character => validHexCharacters.has(character));
}

const validEyeColors = new Set(["amb", "blu", "brn", "gry", "grn", "hzl", "oth"]);
function hasValidEyeColor(passport: Passport) {
    return validEyeColors.has(passport.get("ecl"));
}

function hasValidPassportId(passport: Passport) {
    const passportId = passport.get("pid");

    return (passportId.length === 9);
}

function isValidPart2Passport(passport: Passport) {
    return hasValidEyeColor(passport)
        && hasValidPassportId(passport)
        && hasValidBirthYear(passport)
        && hasValidExpirationYear(passport)
        && hasValidIssueYear(passport)
        && hasValidHeight(passport)
        && hasValidHairColor(passport)
        && hasValidEyeColor(passport);
}

const validPart1Passports = new Set<Passport>();
const validPart2Passports = new Set<Passport>();
let currentPassport: Passport = new Map();

for (let row of rawRows) {
    if (row.length > 1) {
        const pairs = row.split(" ");
        pairs.forEach(pair => {
            const [key, value] = pair.split(":");
            currentPassport.set(key, value);
        });
    } else {
        if (isValidPart1Passport(currentPassport)) {
            validPart1Passports.add(currentPassport);

            if (isValidPart2Passport(currentPassport)) {
                validPart2Passports.add(currentPassport);
            }
        }

        currentPassport = new Map();
    }
}

// 260
console.log("Part 1 There are " + validPart1Passports.size + " valid passports");

// 153
console.log("Part 2 There are " + validPart2Passports.size + " valid passports");

export {};

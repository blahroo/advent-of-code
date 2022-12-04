const input = "183564-657474";

const values = input
    .split("-")
    .map(Number);

const minimumRange = values[0];
const maximumRange = values[1];

const countOccourencesOfDigit = (digit: number, digits: number[]): number => {
    return digits
        .filter(thisValue => thisValue === digit)
        .length;
}

const containsTwoAdjacentMatchingDigitsNotPartOfGreaterSequence = (digits: number[]): boolean => {
    const uniqueDigits = new Set(digits);

    for (let uniqueDigit of uniqueDigits) {
        if (2 == countOccourencesOfDigit(uniqueDigit, digits)) {
            return true;
        }
    }

    return false;
}

const leftToRightNeverDecreases = (digits: number[]): boolean => {
    let lastValue = digits[0];

    for (let i = 1; i < digits.length; ++i) {
        const thisValue = digits[i];
        if (thisValue < lastValue) {
            return false;
        }
        lastValue = thisValue;
    }

    return true;
}

const isValidPassword = (password: number): boolean => {
    const digits = password
        .toString()
        .split("")
        .map(Number);

    return containsTwoAdjacentMatchingDigitsNotPartOfGreaterSequence(digits) && leftToRightNeverDecreases(digits);
}

const possiblePasswords: number[] = [];

for (let password = minimumRange; password <= maximumRange; ++password) {
    if (isValidPassword(password)) {
        possiblePasswords.push(password);
    }
}

console.log(`112233 = ${isValidPassword(112233)} expected true`);
console.log(`123444 = ${isValidPassword(123444)} expected false`);
console.log(`111122 = ${isValidPassword(111122)} expected true`);

console.log("Total possible passwords = " + possiblePasswords.length);

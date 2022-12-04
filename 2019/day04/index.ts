const input = "183564-657474";

const values = input
    .split("-")
    .map(Number);

const minimumRange = values[0];
const maximumRange = values[1];

const twoAdjacentDigitsAreTheSame = (digits: number[]): boolean => {
    for (let i = 0; i < digits.length - 1; ++i) {
        if (digits[i] === digits[i+1]) {
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

    return twoAdjacentDigitsAreTheSame(digits) && leftToRightNeverDecreases(digits);
}

console.log(`111111 = ${isValidPassword(111111)}`);
console.log(`223450 = ${isValidPassword(223450)}`);
console.log(`123789 = ${isValidPassword(123789)}`);

const possiblePasswords: number[] = [];

for (let password = minimumRange; password <= maximumRange; ++password) {
    if (isValidPassword(password)) {
        possiblePasswords.push(password);
    }
}

console.log("Total possible passwords = " + possiblePasswords.length);

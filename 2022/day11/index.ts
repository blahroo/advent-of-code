import { Day11Input } from "./input";
import _times from "lodash/times";

type SingleOperation = "square";
type ParameterizedOperation = ["add" | "multiply", number];
type Operation = SingleOperation | ParameterizedOperation;

type Throw = {
  value: number;
  to: number;
};

class Monkey {
  readonly falseMonkeyIndex: number;
  readonly items: number[];
  readonly name: string;
  readonly operation: Operation;
  readonly testDivisibleBy: number;
  readonly trueMonkeyIndex: number;
  totalItemsInspected = 0;

  constructor([
    indexLine,
    startingLine,
    operationLine,
    testLine,
    trueLine,
    falseLine,
  ]: [string, string, string, string, string, string]) {
    this.name = indexLine;

    const [_, rawItems] = startingLine.split(": ");
    this.items = rawItems.split(", ").map(Number);

    const operationParts = operationLine.split(" ");
    const param = operationParts.pop();
    const op = operationParts.pop();
    if (op === "*") {
      if (param === "old") {
        this.operation = "square";
      } else {
        this.operation = ["multiply", Number(param)];
      }
    } else {
      this.operation = ["add", Number(param)];
    }

    const divisibleParts = testLine.split(" ");
    this.testDivisibleBy = Number(divisibleParts.pop());

    const trueParts = trueLine.split(" ");
    this.trueMonkeyIndex = Number(trueParts.pop());

    const falseParts = falseLine.split(" ");
    this.falseMonkeyIndex = Number(falseParts.pop());
  }

  #describeOperation() {
    if (this.operation === "square") {
      return "old * old";
    }

    return `old ${this.operation[0] === "add" ? "+" : "*"} ${
      this.operation[1]
    }`;
  }

  print() {
    const output: string[] = [
      this.name,
      `  Items: ${this.items.join(", ")}`,
      `  Operation: new = ${this.#describeOperation()}`,
      `  Divisible by ${this.testDivisibleBy}`,
      `    If true: throw to monkey ${this.trueMonkeyIndex}`,
      `    If false: throw to monkey ${this.falseMonkeyIndex}`,
    ];

    console.log(output.join("\n"));
  }

  printItems() {
    console.log(`${this.name} ${this.items.join(", ")}`);
  }

  receiveItem(value: number) {
    this.items.push(value);
  }

  #applyWorry(value: number) {
    if (this.operation === "square") {
      return value * value;
    }

    if (this.operation[0] === "add") {
      return value + this.operation[1];
    }

    return value * this.operation[1];
  }

  protected decayWorryLevel(value: number) {
    return Math.floor(value / 3);
  }

  protected throwItem(to: number, value: number): Throw {
    return {
      to,
      value,
    };
  }

  #processItem(item: number): Throw {
    ++this.totalItemsInspected;
    const activeWorryLevel = this.#applyWorry(item);
    const decayedWorryLevel = this.decayWorryLevel(activeWorryLevel);

    const wasDivisible = decayedWorryLevel % this.testDivisibleBy === 0;

    return this.throwItem(
      wasDivisible ? this.trueMonkeyIndex : this.falseMonkeyIndex,
      decayedWorryLevel
    );
  }

  tick(): Throw[] {
    const output: Throw[] = [];

    while (this.items.length) {
      const item = this.items.shift();
      output.push(this.#processItem(item));
    }

    return output;
  }
}

const monkeys: Monkey[] = [];
const monkeysInput = [...Day11Input];

while (monkeysInput.length) {
  const monkey = new Monkey([
    monkeysInput.shift(),
    monkeysInput.shift(),
    monkeysInput.shift(),
    monkeysInput.shift(),
    monkeysInput.shift(),
    monkeysInput.shift(),
  ]);
  monkeys.push(monkey);

  // Burn the empty line
  monkeysInput.shift();
}

const superModulus = monkeys.reduce(
  (runningTotal, monkey) => monkey.testDivisibleBy * runningTotal,
  1
);
class NonCalmingMonkey extends Monkey {
  constructor(input: [string, string, string, string, string, string]) {
    super(input);
  }

  protected decayWorryLevel(value: number) {
    return value;
  }

  protected throwItem(to: number, value: number): Throw {
    return {
      to,
      value: value % superModulus,
    };
  }
}

const nonCalmingMonkeysInput = [...Day11Input];
const nonCalmingMonkeys: NonCalmingMonkey[] = [];

while (nonCalmingMonkeysInput.length) {
  const monkey = new NonCalmingMonkey([
    nonCalmingMonkeysInput.shift(),
    nonCalmingMonkeysInput.shift(),
    nonCalmingMonkeysInput.shift(),
    nonCalmingMonkeysInput.shift(),
    nonCalmingMonkeysInput.shift(),
    nonCalmingMonkeysInput.shift(),
  ]);
  nonCalmingMonkeys.push(monkey);

  // Burn the empty line
  nonCalmingMonkeysInput.shift();
}

const getMonkeyBusiness = (sourceMonkeys: Monkey[], totalRounds: number) => {
  _times(totalRounds).forEach((round) => {
    sourceMonkeys.forEach((monkey) => {
      const throws = monkey.tick();
      throws.forEach(({ to, value }) => {
        sourceMonkeys[to].receiveItem(value);
      });
    });
  });

  const activeLevels = sourceMonkeys.map((monkey) => {
    return monkey.totalItemsInspected;
  });

  const sorted = activeLevels.sort((a, b) => b - a);
  const monkeyBusinessLevel = sorted[0] * sorted[1];
  return monkeyBusinessLevel;
};

console.log({
  part1: getMonkeyBusiness(monkeys, 20),
  part2: getMonkeyBusiness(nonCalmingMonkeys, 10000),
});

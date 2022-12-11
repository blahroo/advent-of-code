import { Day11Input } from "./input";
import _times from "lodash/times";
/*
const lines = `Monkey 0:
Starting items: 79, 98
Operation: new = old * 19
Test: divisible by 23
  If true: throw to monkey 2
  If false: throw to monkey 3

Monkey 1:
Starting items: 54, 65, 75, 74
Operation: new = old + 6
Test: divisible by 19
  If true: throw to monkey 2
  If false: throw to monkey 0

Monkey 2:
Starting items: 79, 60, 97
Operation: new = old * old
Test: divisible by 13
  If true: throw to monkey 1
  If false: throw to monkey 3

Monkey 3:
Starting items: 74
Operation: new = old + 3
Test: divisible by 17
  If true: throw to monkey 0
  If false: throw to monkey 1`.split("\n");
*/
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

  #processItem(item: number): Throw {
    ++this.totalItemsInspected;
    const activeWorryLevel = this.#applyWorry(item);
    const boredWorryLevel = Math.floor(activeWorryLevel / 3);

    const wasDivisible = boredWorryLevel % this.testDivisibleBy === 0;

    return {
      to: wasDivisible ? this.trueMonkeyIndex : this.falseMonkeyIndex,
      value: boredWorryLevel,
    };
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
const input = [...Day11Input];

while (input.length) {
  monkeys.push(
    new Monkey([
      input.shift(),
      input.shift(),
      input.shift(),
      input.shift(),
      input.shift(),
      input.shift(),
    ])
  );

  // Burn the empty line
  input.shift();
}

/*
monkeys.forEach((monkey) => {
  monkey.print();
  console.log("");
});
*/

const ROUNDS = 20;
_times(ROUNDS).forEach((round) => {
  /*
  if (round !== 0) {
    console.log("");
  }
  console.log(`Round ${round + 1}`);
*/
  monkeys.forEach((monkey) => {
    const throws = monkey.tick();
    throws.forEach(({ to, value }) => {
      monkeys[to].receiveItem(value);
    });
  });
  /*
  monkeys.forEach((monkey) => {
    monkey.printItems();
  });*/
});

const activeLevels = monkeys.map((monkey) => {
  //console.log(`${monkey.name} inspected items ${monkey.totalItemsInspected} times`);
  return monkey.totalItemsInspected;
});

const sorted = activeLevels.sort((a, b) => b - a);
const monkeyBusinessLevel = sorted[0] * sorted[1];
console.log({ monkeyBusinessLevel });

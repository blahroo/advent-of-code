import { Day13Input } from "./input";
import _isNumber from "lodash/isNumber";

const lines = Day13Input;

type Data = number | number[];
type Pair = {
  left: Data;
  right: Data;
};

const pairs: Pair[] = [];
const packets: Data[] = [];

while (lines.length) {
  const left: Data = JSON.parse(lines.shift());
  const right: Data = JSON.parse(lines.shift());

  pairs.push({
    left,
    right,
  });

  packets.push(left);
  packets.push(right);

  // Burn the empty line
  lines.shift();
}

const isRightOrder = (left: Data, right: Data) => {
  if (_isNumber(left) && _isNumber(right) && left !== right) {
    return left < right;
  }

  const leftIsArray = Array.isArray(left);
  const rightIsArray = Array.isArray(right);

  if (leftIsArray && rightIsArray) {
    const longest = Math.max(left.length, right.length);
    for (let i = 0; i < longest; i++) {
      if (i === left.length) {
        return true;
      }
      if (i === right.length) {
        return false;
      }

      const output = isRightOrder(left[i], right[i]);
      if (output !== undefined) {
        return output;
      }
    }
  }

  if (leftIsArray !== rightIsArray) {
    return isRightOrder(
      leftIsArray ? left : [left],
      rightIsArray ? right : [right]
    );
  }

  return undefined;
};

const summedIndexesInRightOrder = pairs.reduce(
  (runningTotal, pair, currentIndex) => {
    if (isRightOrder(pair.left, pair.right)) {
      return runningTotal + (currentIndex + 1);
    }

    return runningTotal;
  },
  0
);

console.log({ summedIndexesInRightOrder });

packets.push(JSON.parse("[[2]]"));
packets.push(JSON.parse("[[6]]"));

packets.sort((a, b) => {
  const result = isRightOrder(a, b);

  return result === undefined ? 0 : result ? -1 : 1;
});

let a = 0;
let b = 0;

packets.forEach((packet, index) => {
  if (Array.isArray(packet) && packet.length === 1) {
    if (Array.isArray(packet[0]) && packet[0].length === 1) {
      if (packet[0][0] === 2) {
        a = index + 1;
      } else if (packet[0][0] === 6) {
        b = index + 1;
      }
    }
  }
});

console.log(`Part 2 = ${a * b}`);

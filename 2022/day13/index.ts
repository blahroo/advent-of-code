import { Day13Input } from "./input";
import _isNumber from "lodash/isNumber";

const lines = Day13Input;

type Data = number | number[];
type Pair = {
  left: Data;
  right: Data;
};

const pairs: Pair[] = [];

while (lines.length) {
  pairs.push({
    left: JSON.parse(lines.shift()),
    right: JSON.parse(lines.shift()),
  });

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

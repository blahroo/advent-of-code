import { INPUT } from "./input"

const DIGIT_STRINGS: ReadonlySet<string> = new Set(['1', '2', '3', '4', '5', '6', '7', '8', '9']);

const ORIGINAL_LINES = INPUT.split('\n');

function sumLines(lines: Readonly<Array<string>>): number {
  return lines.reduce((runningTotal, line) => {
    const characters = line.split('');
    const leftMost = characters.find(character => DIGIT_STRINGS.has(character));
    characters.reverse();
    const rightMost = characters.find(character => DIGIT_STRINGS.has(character));

    return runningTotal + Number(`${leftMost}${rightMost}`);
  }, 0);
}

const part1 = sumLines(ORIGINAL_LINES);
console.log({ part1 });

const DECODED_LINES = ORIGINAL_LINES.map(line => {
  const lineOutput: string[] = [];

  for (let i = 0; i < line.length; ++i) {
    const remainingLineString = line.slice(i);
    lineOutput.push(readDigitFromStartOfString(remainingLineString));
  }

  return lineOutput.join('');
});

function readDigitFromStartOfString(source: string) {
  if (source.startsWith('1') || source.startsWith('one')) {
    return '1';
  }
  if (source.startsWith('2') || source.startsWith('two')) {
    return '2';
  }
  if (source.startsWith('3') || source.startsWith('three')) {
    return '3';
  }
  if (source.startsWith('4') || source.startsWith('four')) {
    return '4';
  }
  if (source.startsWith('5') || source.startsWith('five')) {
    return '5';
  }
  if (source.startsWith('6') || source.startsWith('six')) {
    return '6';
  }
  if (source.startsWith('7') || source.startsWith('seven')) {
    return '7';
  }
  if (source.startsWith('8') || source.startsWith('eight')) {
    return '8';
  }
  if (source.startsWith('9') || source.startsWith('nine')) {
    return '9';
  }

  return '';
}

const part2 = sumLines(DECODED_LINES);
console.log({ part2 });

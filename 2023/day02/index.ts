import { INPUT } from "./input";

const RAW_LINES = INPUT.split('\n');

const mapped = RAW_LINES.map((line, lineIndex) => {
  const withoutId = line.replace(`Game ${lineIndex + 1}: `, '');
  const sets = withoutId.split('; ');

  return sets.map(set => {
    const balls = set.split(', ').reduce((running: Record<string, number>, totalAndColor): Record<string, number> => {
      const [totalStr, color] = totalAndColor.split(' ');

      return {
        ...running,
        [color]: Number(totalStr),
      }
    }, {});

    //console.log({ balls })

    return balls;
  });
});

const gameIsPossible = (game: Array<Record<string, number>>) => {
  for (const set of game) {
    if (set['green'] > 13 || set['red'] > 12 || set['blue'] > 14) {
      return false;
    }
  }

  return true;
}

const getPossibleGameIds = (games: Array<Array<Record<string, number>>>) => {
  const possibleIds: Array<number> = [];

  games.forEach((game, gameIndex) => {
    const gameId = gameIndex + 1;

    if (gameIsPossible(game)) {
      possibleIds.push(gameId);
    }
  })

  return possibleIds
}

const possibleGameIds = getPossibleGameIds(mapped);
const summedIds = possibleGameIds.reduce((runningTotal, gameId) => runningTotal + gameId, 0);

console.log({ summedIds })

const powers = mapped.map((game, gameIndex) => {
  let blue = 0;
  let green = 0;
  let red = 0;

  game.forEach(set => {
    blue = Math.max(blue, set['blue'] ?? 0);
    green = Math.max(green, set['green'] ?? 0);
    red = Math.max(red, set['red'] ?? 0);
  })

  const power = red * green * blue;
  return power;
});

const summedPowers = powers.reduce((runningTotal, power) => runningTotal + power, 0);
console.log({ summedPowers })

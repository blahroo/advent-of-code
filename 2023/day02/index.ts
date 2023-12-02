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

    console.log({ balls })

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

console.log({ possibleGameIds, summedIds })

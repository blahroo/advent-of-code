import { Day06Input } from "./input";

const characters = Day06Input.split("");

const part1 =
  4 +
  characters.findIndex((currentChar, currentIndex, allCharacters) => {
    const chars = allCharacters
      .slice(currentIndex, currentIndex + 4)
      .filter(Boolean);

    return new Set(chars).size === 4;
  });

const part2 =
  14 +
  characters.findIndex((currentChar, currentIndex, allCharacters) => {
    const chars = allCharacters
      .slice(currentIndex, currentIndex + 14)
      .filter(Boolean);

    return new Set(chars).size === 14;
  });

console.log({
  part1,
  part2,
});

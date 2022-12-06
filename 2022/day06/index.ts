import { Day06Input } from "./input";

const characters = Day06Input.split("");

const part1 =
  4 +
  characters.findIndex((currentChar, currentIndex, allCharacters) => {
    const chars = [
      currentChar,
      allCharacters[currentIndex + 1],
      allCharacters[currentIndex + 2],
      allCharacters[currentIndex + 3],
    ].filter(Boolean);

    const uniqueChars: ReadonlySet<String> = new Set(chars);

    return uniqueChars.size === 4;
  });

console.log({
  part1,
});

import { Day21Input } from "./input";

const yells = new Map<string, number>();

while (!yells.has("root")) {
  for (const line of Day21Input) {
    const [nameWithColon, valueOrNameA, operationMaybe, nameB] =
      line.split(" ");
    const name = nameWithColon.replace(":", "");

    if (!yells.has(name)) {
      // Has not yelled yet, see if can be done
      if (operationMaybe === undefined) {
        // A must be a number, yell it
        yells.set(name, Number(valueOrNameA));
      } else {
        // A is a name, see if it and other side has yelled
        const valueA = yells.get(valueOrNameA);
        const valueB = yells.get(nameB);

        if (valueA !== undefined && valueB !== undefined) {
          // Perform the operation and yell the result
          switch (operationMaybe) {
            case "+":
              yells.set(name, valueA + valueB);
              break;
            case "*":
              yells.set(name, valueA * valueB);
              break;
            case "-":
              yells.set(name, valueA - valueB);
              break;
            case "/":
              yells.set(name, valueA / valueB);
              break;
            default:
              throw new Error("Unexpected situation");
          }
        }
      }
    }
  }
}

console.log(yells.get("root"));

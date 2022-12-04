import { Day04Input } from "./input";

const assignmentToString = (assignment: string) => {
  const [start, end] = assignment.split("-").map(Number);

  const digits: Array<number | string> = [];
  for (let i = start; i <= end; ++i) {
    if (i < 10) {
      digits.push("0" + i);
    } else {
      digits.push(i);
    }
  }

  return digits.join(",");
};

const oneAssignmentFullyContainsTheOther = (line: string) => {
  const assignments = line.split(",");

  const left = assignmentToString(assignments[0]);
  const right = assignmentToString(assignments[1]);

  return left.indexOf(right) >= 0 || right.indexOf(left) >= 0;
};

let totalContained = 0;
for (const line of Day04Input) {
  if (oneAssignmentFullyContainsTheOther(line)) {
    ++totalContained;
  }
}

console.log({ totalContained });

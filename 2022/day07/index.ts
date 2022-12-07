import { Day07Input } from "./input";

type File = {
  name: string;
  size: number;
};

type Directory = {
  directoryNames: string[];
  files: File[];
};

let currentPath = "";
const DirectoryMap = new Map<string, Directory>();

const getDirectory = (path: string) => {
  const thisDirectory = DirectoryMap.get(path);
  if (!thisDirectory) {
    throw new Error("No directory map entry for " + path);
  }

  return thisDirectory;
};

for (const line of Day07Input) {
  const parts = line.split(" ");

  if (parts[0] === "$") {
    const command = parts[1];

    if (command === "cd") {
      const dirName = parts[2];
      const pathParts = currentPath.split("/").filter((c) => c !== "");

      if (dirName === "..") {
        pathParts.pop();
      } else {
        pathParts.push(dirName);
      }

      currentPath = currentPath === "" ? "/" : "/" + pathParts.join("/");
    } else if (command === "ls") {
      DirectoryMap.set(currentPath, {
        directoryNames: [],
        files: [],
      });
    }
  } else {
    const thisDirectory = getDirectory(currentPath);

    if (parts[0] === "dir") {
      thisDirectory.directoryNames.push(parts[1]);
    } else {
      thisDirectory.files.push({
        name: parts[1],
        size: Number(parts[0]),
      });
    }
  }
}

const getDirectorySize = (path: string) => {
  const { directoryNames, files } = getDirectory(path);

  const myFileSizes = files.reduce((runningTotal, { size }) => {
    return runningTotal + size;
  }, 0);

  const myDirectoriesSizes = directoryNames.reduce(
    (runningTotal, directory) => {
      const subDirectoryPath =
        path === "/" ? "/" + directory : path + "/" + directory;

      return runningTotal + getDirectorySize(subDirectoryPath);
    },
    0
  );

  return myFileSizes + myDirectoriesSizes;
};

let sumOfAllUpTo100000 = 0;
for (const [path, directory] of DirectoryMap.entries()) {
  const size = getDirectorySize(path);
  if (size <= 100000) {
    sumOfAllUpTo100000 += size;
  }
}

console.log({ part1: sumOfAllUpTo100000 });

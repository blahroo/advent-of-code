interface IOrbitConfigutaion {
    readonly orbitted: string;
    readonly orbitting: string;
}

class OrbitConfiguration implements IOrbitConfigutaion {
    public readonly orbitted: string;
    public readonly orbitting: string;

    constructor(rawInput: string) {
        const parts = rawInput.split(')');

        if (parts.length !== 2) {
            throw new Error("Expected 2 parts for input " + rawInput + " actually received " + parts.length);
        }

        this.orbitted = parts[0];
        this.orbitting = parts[1];
    }
}

const orbitConfigurations: OrbitConfiguration[] = require('fs')
    .readFileSync('2019/day06/input.txt')
    .toString()
    .split("\n")
    .map((rawLine: string) => new OrbitConfiguration(rawLine));

console.log(orbitConfigurations[0]);

interface IObject {
    readonly id: string;
    readonly children: IObject[];

    addChild(child: IObject): void;
}

class OrbitableObject implements IObject {
    public readonly children: IObject[] = [];

    constructor(public readonly id: string) { }

    addChild(child: IObject) {
        this.children.push(child);
    }
}

const objectCache: Map<string, IObject> = new Map();

const safeGetFromCache = (id: string): IObject => {
    if (objectCache.has(id)) {
        return objectCache.get(id);
    }

    throw Error("Expected object with id " + id + " to be in cache");
}

const addToCacheIfNotExisting = (id: string) => {
    if (objectCache.has(id)) {
        return;
    }

    objectCache.set(id, new OrbitableObject(id));
};

orbitConfigurations.forEach(orbitConfiguration => {
    addToCacheIfNotExisting(orbitConfiguration.orbitting);
    addToCacheIfNotExisting(orbitConfiguration.orbitted);
});

console.log("There are " + objectCache.size + " unique orbitable objects");

orbitConfigurations.forEach(orbitConfiguration => {
    const orbittedObject = safeGetFromCache(orbitConfiguration.orbitted);
    const orbittingObject = safeGetFromCache(orbitConfiguration.orbitting);

    orbittedObject.addChild(orbittingObject);
});

const universalCenterOfMass = safeGetFromCache("COM");
console.log(universalCenterOfMass);

export {};

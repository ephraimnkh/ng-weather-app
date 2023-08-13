const fs = require('fs');
const packageJson = require('./package.json');

type FunctionToReturnString = () => string;

type UpdateFunction = Record<string, FunctionToReturnString>

const updateFunctions: UpdateFunction = {
    'major': () => {
        const versionNumbers = getVersionNumbers();
        versionNumbers.major += 1;
        versionNumbers.minor = 0;
        versionNumbers.patch = 0;
        return convertVersionToString(versionNumbers);
    },
    'minor': () => {
        const versionNumbers = getVersionNumbers();
        versionNumbers.minor += 1;
        versionNumbers.patch = 0;
        return convertVersionToString(versionNumbers);
    },
    'patch': () => {
        const versionNumbers = getVersionNumbers();
        versionNumbers.patch += 1;
        return convertVersionToString(versionNumbers);
    }
};

type VersionNumbers = {
    major: number;
    minor: number;
    patch: number;
}

function getVersionNumbers(): VersionNumbers {
    const versionNumbers = packageJson.version.split('.');
    const major = versionNumbers[0];
    const minor = versionNumbers[1];
    const patch = versionNumbers[2];
    return {
        major: parseInt(major),
        minor: parseInt(minor),
        patch: parseInt(patch)
    }
}

function convertVersionToString(versionNumbers: VersionNumbers): string {
    const { major, minor, patch } = versionNumbers;
    return `${major}.${minor}.${patch}`;
}

const args = process.argv;
const numberToUpdate = args[2];
packageJson.version = updateFunctions[numberToUpdate]() || packageJson.version;

fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, 2));


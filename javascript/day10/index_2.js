const fs = require('fs');
const path = require('path');

const adapters = fs.readFileSync(path.join(__dirname, './input.txt'), 'utf8')
    .split("\n")
    .filter((line) => line)
    .concat(["0"])
    .map((joltage) => 1 * joltage)
    .sort((a, b) => {
        return a - b;
    })
    .map((joltage, index) => {
        return {
            index,
            minJoltage: joltage,
            maxJoltage: joltage + 3
        };
    });

    const last = adapters[adapters.length - 1];
    adapters.push({
        minJoltage: last.minJoltage + 3,
        maxJoltage: last.maxJoltage + 3,
    });

    const pahtWays = [];

    function traverse(current) {
        if (current.index === adapters.length){
            return 1;
        }

        if ((current.index in pahtWays)) {
            return pahtWays[current.index];
        }
        let pahtCount = 0;

        adapters
            .slice(current.index + 1)
            .filter((adapter) => {
                return current.maxJoltage >= adapter.minJoltage &&
                    current.maxJoltage <= adapter.maxJoltage;
            })
            .forEach((adapter) => {
                pahtCount += traverse(adapter)
            });

            pahtWays[current.index] = pahtCount;
            return pahtCount;
    }


    const result = traverse(adapters[0]);
    console.log(result);
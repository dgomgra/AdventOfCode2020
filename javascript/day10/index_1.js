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
    .map((joltage) => {
        return {
            minJoltage: joltage,
            maxJoltage: joltage + 3
        };
    });

    const last = adapters[adapters.length - 1];
    adapters.push({
        minJoltage: last.minJoltage + 3,
        maxJoltage: last.maxJoltage + 3,
    });

    const histogram = [];

    adapters
        .slice(0, adapters.length -1)
        .forEach((adapter, index) => {
            const difference = adapters[index + 1].minJoltage - adapter.minJoltage;
            if (!(difference in histogram)){
                histogram[difference] = 0;
            }

            histogram[difference]++;
        });

        const result = histogram[1] * histogram[3];
        console.log(result);
        console.log(histogram);

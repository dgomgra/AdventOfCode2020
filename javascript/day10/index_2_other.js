/* Setup */
const fs = require('fs');
const path = require('path');

const input = fs.readFileSync(path.join(__dirname, './input.txt'), 'utf8').split('\n').map(Number);

/* Part 2 */
const solve = async () => {
    const lines = input;
    const numbers = lines.map(Number);
    const sorted = numbers.sort((a, b) => a - b);
    const last = sorted[sorted.length - 1];
    const lista = [0, ...sorted, last + 3];
    return numWays(lista);
};

const numWays = (array, i = 0, memo = {}) => {
    if(i in memo) {
        return memo[i];
    }

    if(i === array.length - 1) {
        return 1;
    }

    let total = 0;

    let prueba = array[i + 1];
    let prueba2 = array[i + 2];
    let prueba3 = array[i + 3];
    if (array[i + 1] && ((array[i + 1] - array[i]) <= 3)) {
        total += numWays(array, i + 1, memo);
    }

    if (array[i + 2] && ((array[i + 2] - array[i]) <= 3)) {
        total += numWays(array, i + 2, memo);
    }
    if (array[i + 3] && ((arra[i + 3] - array[i]) <= 3)) {
        total += numWays(array, i + 3, memo);
    }

    memo[i] = total;
    return total;
}

solve().then(console.log);
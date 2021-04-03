/* Setup */
const fs = require('fs');
const path = require('path');

const input = [0].concat(fs.readFileSync(path.join(__dirname, './input.txt'), 'utf8').split('\n').map(Number));
input.sort((a, b) => a-b);




/* Part 2 */

function combinacion(array, memo={}){
    const key = array.join`,`;
    if(key in memo) {
        return memo[key];
    }

    let result = 1;
    for (let i = 1; i < array.length - 1; i++) {
        if(array[i+1] - array[i-1] <= 3) {
            const arr2 =[array[i-1]].concat(array.slice(i+1));
            result += combinacion(arr2, memo)
        }        
    }
    memo[key] = result;

    if(result === 8) {
        console.log(memo);
    }
    return result;
}

console.log(combinacion(input));
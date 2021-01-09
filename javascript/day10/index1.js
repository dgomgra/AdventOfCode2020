/* Setup */
const fs = require('fs');
const path = require('path');

const input = fs.readFileSync(path.join(__dirname, './input.txt'), 'utf8').split('\n').map(Number);

const inputA = [
    16,
    10,
    15,
    5,
    1,
    11,
    7,
    19,
    6,
    12,
    4
];


const inputB = [
    28,
    33,
    18,
    42,
    31,
    14,
    46,
    20,
    48,
    47,
    24,
    23,
    49,
    45,
    19,
    38,
    39,
    11,
    1,
    32,
    25,
    35,
    8,
    17,
    7,
    9,
    4,
    2,
    34,
    10,
    3
];


/* Part 1 */
resolvePart1();
function resolvePart1(){
    // Ordenamos el array
    input.sort(function(a, b) {return a - b;});

    // incluimos un valor más al final con una diferencia de 3
    let lastValue = input[input.length - 1] + 3;
    input.push(lastValue);

    let oneJolts = [];
    let threeJolts = [];

    let adPrev = 0;
    for(let ad of input){
        if(ad - adPrev === 1) {
            oneJolts.push(ad);
            adPrev = ad;
        } else if(ad - adPrev === 3){
            threeJolts.push(ad);
            adPrev = ad;
        } else {
            console.log('Error de programa');
        }
    }
    
    console.log('Numero de 1: ', oneJolts.length);
    console.log('Numero de 3: ', threeJolts.length);
    let resp = oneJolts.length * threeJolts.length;
    console.log('La respuesta a la primera parte: ', resp);
}
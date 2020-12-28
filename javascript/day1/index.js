/* Setup */
const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.join(__dirname, './input.txt'), 'utf8');

/* Part 1*/
const numberList = input.split('\n').map(Number);
numberList.forEach((numberA) => {
    numberList.forEach((numberB) => {
        if(numberA + numberB === 2020) {
            console.log('PART 1:', numberA, numberB, numberA + numberB, numberA * numberB);
        }
    })
});

/* Part 2*/
//const numberList = input.split('\n').map(Number);
numberList.forEach((numberA) => {
    numberList.forEach((numberB) => {
        numberList.forEach((numberC) => {
            if(numberA + numberB + numberC === 2020) {
                console.log('PART 2: ', numberA, numberB, numberC,  numberA + numberB + numberC, numberA * numberB * numberC);
            }
        })
    })
});


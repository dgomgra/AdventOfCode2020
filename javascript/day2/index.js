/* Setup */
const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.join(__dirname, './input.txt'), 'utf8');
const arrayPass = input.split('\n');

/* Part 1*/
let contIncorrectas = 0;
for(let data of arrayPass) {
    let min = parseInt(data.substring(0, data.indexOf("-")));
    let max = parseInt(data.substring(data.indexOf("-") + 1, data.indexOf(" ")));
    let letra = data.substring(data.indexOf(" ") + 1, data.indexOf(":"));
    let password = data.substring(data.indexOf(":") + 1 , data.length);

    arrayChar = password.split("");
    let rep = 0;
    for(let char of arrayChar) {
        if(char === letra) {
            rep++;
        }
    }

    if(rep >= min && rep <= max) {
        contIncorrectas++;
        console.log(min, max, letra, password);
    }

}
console.log('Nº de passwords correctas: ', contIncorrectas);

/* Parte 2*/
let contIncorrectas2 = 0;
for(let data of arrayPass) {
    if(data !== '') {
        let pos1 = parseInt(data.substring(0, data.indexOf("-")));
        let pos2 = parseInt(data.substring(data.indexOf("-") + 1, data.indexOf(" ")));
        let letra = data.substring(data.indexOf(" ") + 1, data.indexOf(":"));
        let password = data.substring(data.indexOf(":") + 1 , data.length);
    
        let char1 = password.substring(pos1 , pos1 + 1);
        let char2 = password.substring(pos2 , pos2 + 1);
        if((char1 === letra && char2 !== letra) || (char1 !== letra && char2 === letra)) {
            contIncorrectas2++;
            console.log(pos1, pos2, letra, password, char1, char2);
        }
    }
}

console.log('Nº de passwords correctas: ', contIncorrectas2);


/* Setup */
const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.join(__dirname, './input.txt'), 'utf8');

/* Part 1*/
let listCard = input.split('\n');

// total filas
let arrayFilas = [];
for(let i=0; i<128; i++){
    arrayFilas.push(i);
}

// total columnas
let arrayColums = [];
for(let i=0; i<8; i++){
    arrayColums.push(i);
}

arrayColums.length
const fsw = require('fs');


let arrayID = [];
for(let c of listCard){
    if(c !== ''){
        let letras = c.split('');
        let listFilaTemp = arrayFilas.slice();
        let listColumTemp = arrayColums.slice();
        for(let j=0; j<7; j++){
            listFilaTemp = getNewList(letras[j], listFilaTemp);
            // fsw.appendFileSync('Output.txt', listFilaTemp + '\n');
        }
        let fila = listFilaTemp[0];
        
        for(let h=7; h<10; h++){
            listColumTemp = getNewList(letras[h], listColumTemp);
            // fsw.appendFileSync('Output.txt', listColumTemp + '\n');
        }
        let column = listColumTemp[0];
    
        let id = fila * 8 + column;
        arrayID.push(id);
    }

}


// fsw.appendFileSync('Output.txt', arrayID + '\n');
arrayID.sort(comparar);
fsw.appendFileSync('Output.txt', arrayID + '\n');
console.log('Respuetas a la primera parte: ', arrayID[arrayID.length - 1]);
fsw.appendFileSync('Output.txt', arrayID[arrayID.length - 1] + '\n');

function comparar ( a, b ){ return a - b; }

function getNewList(part, datos){
    let salida = datos;
    if(part === 'F' || part === 'L'){
        return salida.splice(0, datos.length / 2);
    } else if(part === 'B' || part === 'R'){
        return salida.splice(datos.length / 2, datos.length);
    }
    
}

/* Part 2 */
let valInicial = arrayID[0];
let vacios = [];
let mapID = new Map();

for(let id of arrayID){
 mapID.set(id, id);
 fsw.appendFileSync('Output.txt', mapID + '\n');
}
for(let i=valInicial; i<arrayID.length; i++){
 if(mapID.has(i) === false){
    vacios.push(i);
 }
}

console.log('Respuesta a la segunda parte: ', vacios[0]);


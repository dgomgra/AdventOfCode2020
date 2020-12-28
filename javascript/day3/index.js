/* Setup */
const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.join(__dirname, './input.txt'), 'utf8');
const mapa = input.split('\n');


/* Part1 */ 
let numArboles = 0;
let pos = 0;
const fsw = require('fs');

for(let i=0; i<mapa.length; i++) {
    let datos = mapa[i];
    if(mapa[i] !== '') {
        let linea = mapa[i].split("");
        while(pos > 30) {
            pos = pos - 31;
        }
        if(linea[pos] === '#') {
            linea[pos] = 'X';
            let fila = "";
            for(let char of linea){
                fila = fila + char;
            }
            numArboles++;
            fsw.appendFileSync('mapaOut1.txt', fila + '\n');
        } else {
            linea[pos] = 'O';
            let fila = "";
            for(let char of linea){
                fila = fila + char;
            }
            fsw.appendFileSync('mapaOut1.txt', fila + '\n');
        }
        //console.log(linea);
        pos = pos + 3;
    }
}
 //console.log('nº de arboles: ', numArboles);

 /* Parte 2 */
 let numPend1 = generaPendiente("1", 1, 0, 0);
 let numPend2 = generaPendiente("2", 3, 0, 0);
 let numPend3 = generaPendiente("3", 5, 0, 0);
 let numPend4 = generaPendiente("4", 7, 0, 0);
 let numPend5 = generaPendiente("5", 1, 1, 0);

 console.log(numPend1, numPend2, numPend3, numPend4, numPend5);
 console.log(numPend1 * numPend2 * numPend3 * numPend4 * numPend5);

 function generaPendiente(numPend, derecha, filas, posIni ) {
     let arboles = 0;
    fsw.appendFileSync('mapaOut2.txt', '*** PENDIENTE ' + numPend +  ' ********' + '\n');
     for(let i=0; i<mapa.length; i++) {
        let datos = mapa[i];
        if(mapa[i] !== '') {
            let linea = mapa[i].split("");
            while(posIni > 30) {
                posIni = posIni - 31;
            }
            if(linea[posIni] === '#') {
                linea[posIni] = 'X';
                let fila = "";
                for(let char of linea){
                    fila = fila + char;
                }
                arboles++;
                fsw.appendFileSync('mapaOut2.txt', i + ': ' + fila + '\n');
            } else {
                linea[posIni] = 'O';
                let fila = "";
                for(let char of linea){
                    fila = fila + char;
                }
                fsw.appendFileSync('mapaOut2.txt', i + ': ' + fila + '\n');
            }
            posIni = posIni + derecha;
            i = i + filas;
        }
    }

    return arboles;
 }



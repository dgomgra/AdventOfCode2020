/* Setup */
const fs = require('fs');
const path = require('path');

 const input = fs.readFileSync(path.join(__dirname, './input.txt'), 'utf8').split('\n').map(Number);

let inpu_test = [
    "20",
    "35",
    "15",
    "25",
    "47",
    "40",
    "62",
    "55",
    "65",
    "95",
    "102",
    "117",
    "150",
    "182",
    "127",
    "219",
    "299",
    "277",
    "309",
    "576",
    ""
];

/* Part 2 */
resolvePart();
function resolvePart(){
    let preambulo = [];
    let resto = [];
    let listaCompleta = [];

    let cont = 0;
    for(let n of input){
        if(n !== ''){
            listaCompleta.push(parseInt(n));
            if(cont < 25){
                preambulo.push(parseInt(n));
            } else {
                resto.push(parseInt(n));
            }
        }
        cont++;
    }

    // Recorremos la lista de numeros
    let numbers = [];
    for (let index = 0; index < resto.length; index++) {
        let encontrado = false;
        preambulo.forEach((numberA) => {
            preambulo.forEach((numberB) => {
                if(numberA + numberB === resto[index]){
                    encontrado = true;
                }
            })  
        });

        if(!encontrado) {
            numbers.push(resto[index]);
            break;
        } else {
            preambulo.shift(); // Eliminamos el primer elemento
            preambulo.push(resto[index]); // Añadimos el numero evaluado
        }
        
    }

    let valor = contiguos(numbers[0], listaCompleta);
    console.log('La respuesta a la segunda parte: ', valor);

    
}

function contiguos(number, lista){
    let inicio = 0;
    let contador = 1;
    let arrayNumbers = [];
    for (let index = inicio; index < lista.length; index++) {
        let valor = lista[inicio];
        arrayNumbers.push(valor);
        while(number > valor ){
            valor += lista[contador];
            arrayNumbers.push(lista[contador]);
            contador++;
        }

        if(valor === number){
            // Ordenamos el array
            arrayNumbers.sort(function(a, b) {
                return a - b;
              });
            let first = arrayNumbers[0];
            let last = arrayNumbers[arrayNumbers.length - 1];
            let resultado = first + last;
            return resultado;
        } else {
            inicio++;
            contador = inicio + 1;
            arrayNumbers.splice(0, arrayNumbers.length);
        }
        
    }

}
/* Setup */
const fs = require('fs');
const path = require('path');

const input = fs.readFileSync(path.join(__dirname, './input.txt'), 'utf8').split('\n').map(Number);

/* Part 1 */
resolvePart1();
function resolvePart1(){
    let preambulo = [];
    let resto = [];

    let cont = 0;
    for(let n of input){
        if(n !== ''){
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
        } else {
            preambulo.shift(); // Eliminamos el primer elemento
            preambulo.push(resto[index]); // Añadimos el numero evaluado
        }
        
    }

    console.log(preambulo);
    console.log(resto);
    console.log(numbers);
    console.log('La respuesta a la primera parte: ', numbers[0]);

    
}
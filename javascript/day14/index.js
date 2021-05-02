const fs = require('fs').promises;
const path = require('path');

const readLines = async () => {
    const input = await fs.readFile(path.join(__dirname, './input.txt'), {encoding: 'utf-8'});
    return input.split('\n');
};

const solve = async () => {
    const data = await readLines();
    var mask = '';
    var mapMemories = new Map();
    for(var d of data) {
       var datos = d.split('=');
       if(datos[0].indexOf('mask') > -1) {
        mask = datos[1].trim();
       } else {
            var memoria = parseInt(datos[0].replace('mem[', '') .replace(']', '').trim());
            var valor = parseInt(datos[1]);
            let result = applyMask(mask, valor);
            mapMemories.set(memoria, result);
       }
    }

    let resultado = 0;
    mapMemories.forEach(function(valor, clave, mapMemories) {
        resultado += valor;
      })
    return resultado;
};

function applyMask(mask, number) {
    // convertimos el numero a binario
    var binario = number.toString(2); 

    // igualamos la longitud del binario a la mascara
    while(mask.length > binario.length) {
        binario = '0' + binario;
    }

    let listBinary = [...binario];
    let listMask = [...mask];

    let resultString = '';
    for(var i=0; i<listMask.length; i++) {
        if(listMask[i] === 'X') {
            resultString += listBinary[i];
        } else {
            resultString += listMask[i];
        }
    }

    let salida = parseInt(resultString, 2);
    return salida;
};



solve().then(console.log);
const fs = require('fs').promises;
const path = require('path');

const readLines = async () => {
    const input = await fs.readFile(path.join(__dirname, './input2.txt'), {encoding: 'utf-8'});
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
            // aplicamos la mascara
            let direccionTemp = applyMask(mask, memoria);
            // obtenemos la lista de todas las memorias a modificar
            let listaMemorias = getAddresses(direccionTemp);
            for(let mem of listaMemorias) {
                let value = parseInt(mem, 2);
                mapMemories.set(value, valor);
            }
       }
    }
    let resultado = 0;
    mapMemories.forEach(function(valor, clave, mapMemories) {
        resultado += valor;
      })
    return resultado;
};

const applyMask = (mask, number) => {
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
            resultString += 'X';
        } else if(listMask[i] === '0') {
            resultString += listBinary[i];
        } else {
            resultString += '1';
        }
    }

    //let salida = parseInt(resultString, 2);
    return resultString;
};

const getAddresses = (binary) => {
    if(binary.length === 0) {
        return [''];
    }

    const primerCaracter = binary[0];
    const resto = binary.slice(1);
    const parcial = getAddresses(resto);
    if(primerCaracter === 'X') {
        return [
            ...parcial.map(addr => '0' + addr),
            ...parcial.map(addr => '1' + addr),
        ]
    } else {
        return parcial.map(addr => primerCaracter + addr);
    }
};

//console.log(getAddresses('1X0XX'));


solve().then(console.log);
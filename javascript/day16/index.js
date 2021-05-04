const fs = require('fs').promises;
const path = require('path');

const readLines = async () => {
    const input = await fs.readFile(path.join(__dirname, './input.txt'), {encoding: 'utf-8'});
    return input.split('\n');
};

const solve = async () => {
    const data = await readLines();

    // recorremos los datos
    let rangos = [];
    let ticket = [];
    let cercanos = [];
    let hayRango = true;
    let hayTicket = false;
    let hayCercanos = false;
    let mapNumValidos = new Map();
    let numIncorrectos = [];
    for (let index = 0; index < data.length; index++) {

        let valor = data[index];

        if(valor.indexOf('your ticket') > -1) {
            hayRango = false;
            hayTicket = true;
            hayCercanos = false;
        } else if(valor.indexOf('nearby tickets') > -1) {
            hayRango = false;
            hayTicket = false;
            hayCercanos = true;
        }

        if(hayRango) {
            if(data[index].trim().length > 0) {
                let values = data[index].split(':');
                let rangosLine = values[1].trim().split('or');
                for(let r of rangosLine) {
                    let val = r.trim().split('-');
                    let number = 0;
                    while(val[1] >= number) {
                        if(number >= val[0] && number <= val[1]) {
                            mapNumValidos.set(parseInt(number), number);
                        }
                        number++;
                    }
                }
            }
            //rangos.push(values[1]);
        } else if(hayTicket) {
            if(data[index].trim().length > 0 && data[index].indexOf('your ticket') === -1) {
                ticket.push(data[index]);
            }
        } else if(hayCercanos) {
            if(data[index].trim().length > 0 && data[index].indexOf('nearby tickets') === -1) {
                cercanos.push(data[index]);
            }
        }
    }

    for(let ce of cercanos) {
        let values = ce.trim().split(',');
        for(let n of values) {
            let prueba = mapNumValidos.has(parseInt(n));
            if(!mapNumValidos.has(parseInt(n))) {
                numIncorrectos.push(parseInt(n));
            }
        }
    }

    let total = 0;
    for(let x of numIncorrectos) {
        total += x;
    }

    console.log(numIncorrectos);

    return total;
};

solve().then(console.log);
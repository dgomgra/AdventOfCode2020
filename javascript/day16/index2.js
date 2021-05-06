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
    let cercanosCorrectos = [];
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
            let obj = {
                nombre: '',
                rangos: '',
                numPertidios: new Map(),
                orden: 0
            };
            if(data[index].trim().length > 0) {
                let values = data[index].split(':');
                let rangosLine = values[1].trim().split('or');
                let map = new Map();
                let obj = {
                    nombre: '',
                    rangos: '',
                    numPertidios: new Map(),
                    orden: undefined
                };
                obj.nombre = values[0];
                obj.rangos = values[1];
                for(let r of rangosLine) {
                    let val = r.trim().split('-');
                    let number = 0;
                    while(val[1] >= number) {
                        if(number >= val[0] && number <= val[1]) {
                            mapNumValidos.set(parseInt(number), number);
                            map.set(parseInt(number), number);
                        }
                        number++;
                    }
                    obj.numPertidios = map;
                }
                rangos.push(obj);
            }
            
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
        let correcto = true;
        let values = ce.trim().split(',');
        for(let n of values) {
            let prueba = mapNumValidos.has(parseInt(n));
            if(!mapNumValidos.has(parseInt(n))) {
                numIncorrectos.push(parseInt(n));
                correcto = false;
            }
        }

        if(correcto) {
            cercanosCorrectos.push(ce);
        }
    }

    let total = 0;
    for(let x of numIncorrectos) {
        total += x;
    }

    const result = getOrden(cercanosCorrectos, rangos, ticket);

    return result;
};

const getOrden = (cercanos, rangos, ticket) => {

    cercanos.push(ticket[0]);
    for(let r of rangos) {
        let mapPos = new Map();
        let tam = cercanos[0].split(',').length;
        for(let i = 0; i < tam; i++) {
            let count = 0;
            for(let c of cercanos) {
                let numeros = c.split(',');
                if(r.numPertidios.has(parseInt(numeros[i]))) {
                    count++;
                }
            }
            mapPos.set(i, count);
        }
        
        
        mapPos.forEach(function(valor, clave) {
            if(valor === cercanos.length) {
                if(r.orden === undefined) {
                    r.orden = clave;
                } else {
                    r.orden = r.orden + '-' + clave;
                }
            }
        });
    }


    let valoresSumar = [];

    let arrayOrden = [];
    for(let ran of rangos) {
        arrayOrden.push(ran.orden);
        // if(ran.nombre.indexOf('departure') > -1) {
        //     let numbers = ticket[0].split(',');
        //     valoresSumar.push(numbers[ran.orden]);
        // }
    }

    let val = repetidos(arrayOrden);
    for(let i = 0; i < rangos.length; i++) {
        if(rangos[i].nombre.indexOf('departure') > -1) {
            let numbers = ticket[0].split(',');
            let orden = parseInt(val.get(i));
            valoresSumar.push(numbers[orden]);
        }
    }



    
    let salida = 0;
    for(let val of valoresSumar) {
        if(salida === 0) {
            salida = parseInt(val);
        } else {
            salida = salida * parseInt(val);
        }
    }

    return salida;
}

const repetidos = (arrayOrden) => {
    let salida = new Map();
    let seguir = true;
    let count = 0;
    for(let l of arrayOrden) {
        let valores = undefined;
        try {
            if(l.indexOf('-') > -1) {
                valores = l.split('-');
            // } else {
            //     valores = parseInt(l);
            }
        } catch {
            valores = [l.toString()];
        }
        salida.set(count, valores);
        count++;
    }

    let numBorrar = [];
    while(seguir) {
        seguir = false;
        salida.forEach(function(valor, clave) {
            if(valor.length > 1) {
                seguir = true;

                // Eliminamos los repetidos
                for(let n of numBorrar) {
                    let pos = valor.map(function (e) { return e; }).indexOf(n.toString());
                    if(pos !== -1) {
                        valor.splice(pos, 1);
                        salida.set(clave, valor);
                    }
                }
            } else if (valor.length === 1){
                numBorrar.push(parseInt(valor[0]));
            }
        });
    }

    return salida;
};
 
solve().then(console.log);
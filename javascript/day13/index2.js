/* Setup */
const fs = require('fs').promises;
const path = require('path');

/* Part 2*/
const readLines = async () => {
    const data = await fs.readFile(path.join(__dirname, './input.txt'), {encoding: 'utf-8'});
    return data.split(/\s+/);
};

const solve = async () => {
    const input = await readLines();
    const datos = input[1].split(',');
    const numAutoBuses = datos.length;
    const buses = rellenarDatos(datos);
    return result = comprobarTurnos2(buses);
};

const comprobarTurnos2 = (datos) => {
    let seguir = true;
    // let marca = 100000000000000;
    let marca = 530015546283000;
    // let lista = datos.listaBuses.sort((a, b) => a.id + b.id);
    // console.log(lista);
    while(seguir) {
        // ordenamos la lista 
        let tamLista = datos.listaBuses.length - 1;
        let busFinal = marca % datos.listaBuses[tamLista].id;
        if(busFinal === 0) {
            console.log(marca);
            let final = true;
            let marcaTemp = marca - datos.listaBuses[datos.listaBuses.length - 1].pos;
            for(let d of datos.listaBuses) {
                if((marcaTemp + d.pos) % d.id !== 0) {
                    final = false;
                }
            }
            if(final) {
                seguir = false;
                marca = marcaTemp;
            } else {
                marca++;
                // marca += datos.listaBuses[0].id;
            }
        } else {
            marca ++;
            // marca += datos.listaBuses[0].id;
        }
    }

    return marca;
};

const comprobarTurnos = (datos) => {
    let seguir = true;
    while(seguir) {
        let marcaTiempoBusInicial = datos.listaBuses[0].id + datos.marcaTiempo;
        let marcaTiempoBusFinal = datos.listaBuses[datos.listaBuses.length - 1].salidaAnterior;

        if(marcaTiempoBusInicial === marcaTiempoBusFinal) {
            seguir = false
        } else {
            console.log(datos);
            datos = pasarTiempo(datos);
        }

        // let marcaTiempoFinal = datos[0].marcaTiempo;
        // let cumple = true;
        // for(let d of datos) {
        //     let marcaBus = d.pos + d.marcaTiempo;
        //     if(marcaBus !== marcaTiempoFinal) {
        //         cumple = false;
        //     }
        // }

        // if(!cumple) {
        //     console.log(datos);
        //     datos = pasarTiempo(datos);
        //     // datos = comprobarTurnos(datos);
        // }
    }
    return datos;
};

const rellenarDatos = (datos) => {
    let index = 0;
    let tiempo = {
        marcaTiempo: 0,
        listaBuses: []
    }
    for(let d of datos) {
        if(d !== 'x') {
            let info = {
                id: parseInt(d),
                pos: index,
                salidaAnterior: 0
            };
            tiempo.listaBuses.push(info);
        }
        index ++;
    }
    for(let x of tiempo.listaBuses) {
    }
    return tiempo;
};

const pasarTiempo = (datos) => {
    datos.marcaTiempo = datos.marcaTiempo + 1;
    for(let d of datos.listaBuses) {
        if(datos.marcaTiempo === d.salidaAnterior + d.id) {
            d.salidaAnterior = datos.marcaTiempo;
        }
        // let valor = d.marcaTiempo + parseInt(d.id);
        // d.marcaTiempo = valor;
    }
    return datos;
};


solve().then(console.log);
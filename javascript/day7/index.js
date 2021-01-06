/* Setup */
const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.join(__dirname, './input.txt'), 'utf8');
let listBags = input.split('\n');

/* Part 1*/
resolvePart1();
function resolvePart1(){
    // Creamos un mapa con los distintos tipos de bolsas y lo que contienen
    let mapBags = new Map();
    
    for(let bag of listBags){
        if(bag !== '') {
            let partes = bag.split(' bags contain ');
            // Creamos un mapa con el contenido
            let mapContenido = new Map();
            let content = partes[1].split(', ');
            for(let c of content){
                var re = / bags?\.?/gi;
                
                var key = c.replace(re, "");
                if(key === 'no other'){
                    mapContenido.set(key, 0);
                } else {
                    let value = parseInt(key.substring(0, key.indexOf(" ")));
                    let keySin = key.substring(key.indexOf(" ") + 1, key.length);
                    mapContenido.set(keySin, value);
                }
            }
            mapBags.set(partes[0], mapContenido);
        }
    }
    // console.log(mapBags);

    // Buscamos quien contiene shiny gold
    let mapShiny = new Map();
    let mapFinal = new Map();

    let lista = getContenida('shiny gold', mapBags);
    console.log('La respuesta a la primera parte: ', lista.size);
}

function getContenida(bolsa, lista) {
    let salida = new Map();
    for (var [clave, valor] of lista) {
        if(valor.has(bolsa)){
            salida.set(clave, clave);
            let bolsas = getContenida(clave, lista);
            for(var [c, v]  of bolsas) {
                if(!salida.has(c)){
                    salida.set(c,c);
                }
            }
        }
    }

    return salida;
}

/* Part 2 */
resolvePart2();
function resolvePart2(){
    // Creamos un mapa con los distintos tipos de bolsas y lo que contienen
    let mapBags = new Map();
    
    for(let bag of listBags){
        if(bag !== '') {
            let partes = bag.split(' bags contain ');
            // Creamos un mapa con el contenido
            let mapContenido = new Map();
            let content = partes[1].split(', ');
            for(let c of content){
                var re = / bags?\.?/gi;
                
                var key = c.replace(re, "");
                if(key === 'no other'){
                    mapContenido.set(key, 0);
                } else {
                    let value = parseInt(key.substring(0, key.indexOf(" ")));
                    let keySin = key.substring(key.indexOf(" ") + 1, key.length);
                    mapContenido.set(keySin, value);
                }
            }
            mapBags.set(partes[0], mapContenido);
        }
    }
    // console.log(mapBags);

    let lista = getNumContenidas('shiny gold', mapBags);
    console.log('La respuesta a la segunda parte: ', lista);
}

function getNumContenidas(bolsa, lista) {
    let salida = 0;
    let bolsas = lista.get(bolsa);
    for (var [clave, valor] of bolsas) {
        salida = salida + valor;
        if(clave !== 'no other'){
            let valorTemp = getNumContenidas(clave, lista);
            salida = salida + valor * valorTemp;
        }
    }

    return salida;
}
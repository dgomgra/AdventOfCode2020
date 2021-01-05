/* Setup */
const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.join(__dirname, './input.txt'), 'utf8');

let listAswered = input.split('\n');
/* Part 1*/
resolvePart1();
function resolvePart1(){
    listGroups = [];
    
    let value = '';
    for(let gr of listAswered){
        if(gr === ''){
            listGroups.push(value);
            value = '';
        } else {
            value = value + gr;
        }
    }

    console.log(listGroups.length);
    
    const fsw = require('fs');
    
    // Recorremos las respuestas de los grupos
    let listRespYes = [];
    for(let re of listGroups){
        let resp = re.split('');
        // añadimos las respuesta a un mapa
        let mapResp = new Map();
        for(let r of resp){
            if(!mapResp.has(r)){
                mapResp.set(r);
            }
        }
        listRespYes.push(mapResp.size);
    }
    
    
    // sumamos las respuestas
    let total = 0;
    for(let val of listRespYes){
        total = total + val;
    }
    
    console.log('La respuesta a la primera parte: ',total);
}

/* Part 2 */
resolvePart2();
function resolvePart2() {
    let listGroups = [];
    let listFinal = [];
    // Creamos un array con los grupos
    let value = '';
    for(let gr of listAswered){
        if(gr === ''){
            listGroups.push(value);
            value = '';
        } else {
            value = value + gr + '*';
        }
    }

    // Recorremos las respuestas de cada persona dentro del grupo
    for(let g of listGroups){
        let personas = g.split('*');

        // Recorremos las personas
        let mapResp = new Map();
        for(let p of personas){
            let resp = p.split('');
            for(let r of resp){
                if(mapResp.has(r)){
                    let valor = mapResp.get(r);
                    mapResp.set(r, valor + 1);
                } else {
                    mapResp.set(r, 1);
                }
            }

        }
        // Verificamos ha las que han respondido todos
        let numPers = personas.length - 1;
        let cont = 0;
        for (var [clave, valor] of mapResp) {
            if(valor === numPers){
                cont++;
            }
          }

          listFinal.push(cont);

    }

    // const fsw = require('fs');
    // fsw.appendFileSync('Output.txt', listGroups + '\n');
    // fsw.appendFileSync('Output.txt', listGroups.length + '\n');

    let total = 0;
    for(let val of listFinal){
        total = total + val;
    }
    console.log('La respuesta de la segunda parte: ', total );

}

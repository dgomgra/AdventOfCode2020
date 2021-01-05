/* Part 2 */
let listAswered = ['abc', '', 'a','b','c','','ab','ac', '', 'a','a','a','a','', 'b', ''];

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

    console.log(listFinal);

}

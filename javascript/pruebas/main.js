
let input = [
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

/* Part 1 */
resolvePart1();
function resolvePart1(){
    let preambulo = [];
    let resto = [];
    let listaCompleta = [];

    let cont = 0;
    for(let n of input){
        if(n !== ''){
            listaCompleta.push(parseInt(n));
            if(cont < 5){
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
    console.log(valor);

    // console.log(preambulo);
    // console.log(resto);
    // console.log(numbers);

    
}

function contiguos(number, lista){
    console.log(number);
    console.log(lista);

    for (let index = 0; index < lista.length; index++) {
        let valor = lista[0];
        let contador = 1;
        while(number > valor ){
            valor += lista[contador];
            contador++;
        }

        if(valor === number){
            return valor;
        }
        
    }

}


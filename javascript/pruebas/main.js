
let program = [
    "nop +0",
    "acc +1",
    "jmp +4",
    "acc +3",
    "jmp -3",
    "acc -99",
    "acc +1",
    "jmp -4",
    "acc +6",
    ""
];
let acumulador = 0;
let acumulador2 = 0;

/* Part 1 */
// resolvePart1();
function resolvePart1(){
    // Recorremos el programa
    let numLinea = 0;
    let seguirPrograma = true;
    let mapLineasVistas = new Map();

    while(seguirPrograma){
        if(mapLineasVistas.has(numLinea)){
            seguirPrograma = false;
        } else {
            mapLineasVistas.set(numLinea, numLinea);
            numLinea = buscarLinea(numLinea);
        }
    }

    console.log('La respuesta a la primera parte: ', acumulador);
}

function buscarLinea(num) {
    let linea = program[num];

    let instructions = linea.split(" ");

    if(instructions[0] === 'nop'){
        return num + 1;
    } else if(instructions[0] === 'acc') {
        acumulador = acumulador + parseInt(instructions[1]);
        return num + 1;
    } else if(instructions[0] === 'jmp') {
        let salto = parseInt(instructions[1]);
        return num + salto;
    }

}

/* Part 2 */
let mapLineasCambiadas = new Map();
let hayCambio = false;
resolvePart2();
function resolvePart2(){
        // Recorremos el programa
        let numLinea = 0;
        let seguirPrograma = true;
        let mapLineasVistas = new Map();
        let finPrograma = program.length - 1;
    
        while(seguirPrograma){
            if(numLinea === finPrograma) {
                seguirPrograma = false;
            } else if(mapLineasVistas.has(numLinea)){
                numLinea = 0;
                hayCambio = false;
                mapLineasVistas.clear();
                acumulador2 = 0;
            } else {
                mapLineasVistas.set(numLinea, numLinea);
                numLinea = buscarLinea2(numLinea);
            }
        }
    
        console.log('La respuesta a la segunda parte: ', acumulador2);
    
}

function buscarLinea2(num) {
    let linea = program[num];

    let instructions = linea.split(" ");

    if(instructions[0] === 'nop'){
        if(mapLineasCambiadas.has(num) || hayCambio){
            return num + 1;
        } else {
            hayCambio = true;
            mapLineasCambiadas.set(num, num);
            let salto = parseInt(instructions[1]);
            if(salto === 0){
                salto = 1;
            }
            return num + salto;
        }
    } else if(instructions[0] === 'acc') {
        acumulador2 = acumulador2 + parseInt(instructions[1]);
        return num + 1;
    } else if(instructions[0] === 'jmp') {
        if(mapLineasCambiadas.has(num) || hayCambio){
            let salto = parseInt(instructions[1]);
            return num + salto;
        } else {
            hayCambio = true;
            mapLineasCambiadas.set(num, num);
            return num + 1;
        }
    }

}

let prueba = validaExpresion('.fjd456');
// console.log(prueba);


console.log(validarMapa('pru'));
console.log(validarMapa('brn'));

console.log('numero 2020: ', evaluanumber('2020'))


function validaExpresion(texto) {
    let expresion = /^#[a-zA-Z0-9]{6}/;

    return expresion.test(texto);
}


function validarMapa (valor) {
    var mapa = new Map();
    mapa.set('amp', 'amp');
    mapa.set('blu', 'blu');
    mapa.set('brn', 'brn');
    mapa.set('gry', 'gry');
    mapa.set('grn', 'grn');
    mapa.set('hzl', 'hzl');
    mapa.set('oth', 'oth');

    if(mapa.has(valor)){
        return true;
    } else {
        return false;
    }
}


function evaluanumber(valor) {
    if(valor.length === 4) {
        let number = parseInt(valor);
        if(number >=2020 && number <= 2030) {
            return true;
        } else {
            return false;
        }
    }
}
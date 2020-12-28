
let prueba = validaExpresion('.fjd456');
console.log(prueba);


function validaExpresion(texto) {
    let expresion = /^#[a-zA-Z0-9]{6}/;

    return expresion.test(texto);
}
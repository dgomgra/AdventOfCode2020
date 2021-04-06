/* Setup */
const fs = require('fs').promises;
const path = require('path');

const readLines = async () => {
    const data = await fs.readFile(path.join(__dirname, './input.txt'), {encoding: 'utf-8'});
    return data.split(/\s+/);
    
    // return data.split('\n');
};

// Part 1
const solve = async() => {
    const instrucciones = await readLines();

    let norte = 0;
    let sur = 0;
    let este = 0;
    let oeste = 0;

    let posActual = 'E';

    let tabla = [];
    let inicial = ['N', 'S', 'E', 'W', 'Pos'];
    tabla.push(inicial);
    
    // Recorremos las intrucciones
    for(let i of instrucciones) {
        let mov = i.substring(0, 1);
        let valor = parseInt(i.substring(1, i.length));

        if(mov === 'N') {
            norte = norte + valor;
        } else if(mov === 'S') {
            sur = sur + valor;
        } else if(mov === 'W') {
            oeste = oeste + valor;
        } else if(mov === 'E') {
            este = este + valor;
        } else if(mov === 'R') {
           posActual = getRumbo(posActual, mov, valor);
        } else if(mov === 'L') {
            posActual = getRumbo(posActual, mov, valor);
        } else if(mov === 'F') {
            if(posActual === 'N') {
                norte = norte + valor;
            }

            if(posActual === 'S') {
                sur = sur + valor;
            }

            if(posActual === 'W') {
                oeste = oeste + valor;
            }

            if(posActual === 'E') {
                este = este + valor;
            }
        }
        let datos = [norte, sur, este, oeste, posActual];

        tabla.push(datos);
    }

    let vertical = 0;
    let horzontal = 0;
    if(norte >= sur) {
        vertical = norte - sur;
    } else {
        vertical = sur - norte;
    }

    if(este >= oeste) {
        horzontal = este - oeste;
    } else {
        horzontal = oeste - este;
    }

    console.table(tabla);
    return vertical + horzontal;

};

function getRumbo(posActual, mov, valor) {
    if(mov === 'R') {
        if(posActual === 'N') {
            if(valor === 90) {
                return 'E';
            }
            
            if(valor === 180) {
                return 'S';
            }

            if(valor === 270) {
                return 'W';
            }
        }

        if(posActual === 'S') {
            if(valor === 90) {
                return 'W';
            }
            
            if(valor === 180) {
                return 'N';
            }

            if(valor === 270) {
                return 'E';
            }
        }

        if(posActual === 'W') {
            if(valor === 90) {
                return 'N';
            }
            
            if(valor === 180) {
                return 'E';
            }

            if(valor === 270) {
                return 'S';
            }
        }

        if(posActual === 'E') {
            if(valor === 90) {
                return 'S';
            }
            
            if(valor === 180) {
                return 'W';
            }

            if(valor === 270) {
                return 'N';
            }
        }

    } else if(mov === 'L') {
        if(posActual === 'N') {
            if(valor === 90) {
                return 'W';
            }
            
            if(valor === 180) {
                return 'S';
            }

            if(valor === 270) {
                return 'E';
            }
        }

        if(posActual === 'S') {
            if(valor === 90) {
                return 'E';
            }
            
            if(valor === 180) {
                return 'N';
            }

            if(valor === 270) {
                return 'W';
            }
        }

        if(posActual === 'W') {
            if(valor === 90) {
                return 'S';
            }
            
            if(valor === 180) {
                return 'E';
            }

            if(valor === 270) {
                return 'N';
            }
        }

        if(posActual === 'E') {
            if(valor === 90) {
                return 'N';
            }
            
            if(valor === 180) {
                return 'W';
            }

            if(valor === 270) {
                return 'S';
            }
        }
    }

}



solve().then(data => console.log(data));
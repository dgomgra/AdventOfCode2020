/* Setup */
const fs = require('fs').promises;

var numRonda = 1;

const readLines = async () => {
    const data = await fs.readFile('./input.txt', {encoding: 'utf-8'});
    return data.split(/\s+/);
    // return data.split('\n');
};

/* Part 2 */
const solve = async () => {
    const lines = await readLines();
    const grid = lines.map(line => line.split(''));

    return asientos = iterar(grid);
    
};

function iterar(grid) {
    let gridTemp = [];

    let numCambios = 0;
    for(let i=0; i < grid.length; i++) {
        gridTemp[i] = []; 
        for(let j=0; j < grid[0].length; j++) {
            let num =  checkAsientosOcupados(i, j, grid);
            let curretChair = grid[i][j];

            if(curretChair === 'L' && num === 0) {
                gridTemp[i].push('#'); 
                numCambios++;
               
            } else if(curretChair === '#' && num > 4) {
                gridTemp[i].push('L'); 
                numCambios++;
            } else {
                gridTemp[i].push(curretChair);
            }

        }
    }

    if(numCambios > 0) {
        // console.log('Iteración:', numRonda)
        // console.table(gridTemp);
        numRonda++;
        iterar(gridTemp);
    } else {
        let cont = 0;
        for(let f of gridTemp) {
            for(let c of f) {
                if(c === '#') {
                    cont++;
                }
            }
        }
        console.table(gridTemp);
        console.log('Número asientos ocupados:', cont);
        return cont;
    }

    
}

function checkAsientosOcupados(fila, columna, grid) {
    let columnas = grid[0].length;
    let filas = grid.length;

    let curretChair = grid[fila][columna];

    let oeste;
    let norOeste;
    let surOeste;
    let norte;
    let sur;
    let este;
    let norEste;
    let surEste;

    // Oeste
    if(columna - 1 < 0 ) {
        oeste = 0;
    } else {
        let limite = false;
        let numColumnaResta = 1;
        while(!limite) {
            if(columna - numColumnaResta < 0) {
                oeste = 0;
                limite = true;
            } else {
                if(grid[fila][columna - numColumnaResta] === '#') {
                    oeste = 1;
                    limite = true;
                } else if(grid[fila][columna - numColumnaResta] === 'L') {
                    oeste = 0;
                    limite = true;
                } else {
                    numColumnaResta++;
                }
            }
        }
    }

    // Nor-Oeste
    if(columna - 1 < 0 || fila - 1 < 0) {
        norOeste = 0;
    } else {
        let limite = false;
        let numResta = 1;
        while(!limite) {
            if(columna - numResta < 0 || fila - numResta < 0) {
                norOeste = 0;
                limite = true;
            } else {
                if(grid[fila - numResta][columna - numResta] === '#') {
                    norOeste = 1;
                    limite = true;
                } else if(grid[fila - numResta][columna - numResta] === 'L') {
                    norOeste = 0;
                    limite = true;
                } else {
                    numResta++;
                }
            }
        }
    }

    // Sur-Oeste
    if(columna - 1 < 0 || fila + 1 >= filas) {
        surOeste = 0;
    } else {
        let limite = false;
        let num = 1;
        while(!limite) {
            if(columna - num < 0 || fila + num >= filas) {
                surOeste = 0;
                limite = true;
            } else {
                if(grid[fila + num][columna - num] === '#') {
                    surOeste = 1;
                    limite = true;
                } else if(grid[fila + num][columna - num] === 'L') {
                    surOeste = 0;
                    limite = true;
                } else {
                    num++;
                }
            }
        }
    }

    // Norte
    if(fila - 1 < 0) {
        norte = 0;
    } else {
        let limite = false;
        let num = 1;
        while(!limite) {
            if(fila - num < 0) {
                norte = 0;
                limite = true;
            } else {
                if(grid[fila - num][columna] === '#') {
                    norte = 1;
                    limite = true;
                } else if(grid[fila - num][columna] === 'L') {
                    norte = 0;
                    limite = true;
                } else {
                    num++;
                }
            }
        }
    }

    // Sur
    if(fila + 1 >= filas) {
        sur = 0;
    } else {
        let limite = false;
        let num = 1;
        while(!limite) {
            if(fila + num >= filas) {
                sur = 0;
                limite = true;
            } else {
                if(grid[fila + num][columna] === '#') {
                    sur = 1;
                    limite = true;
                } else if(grid[fila + num][columna] === 'L') {
                    sur = 0;
                    limite = true;
                } else {
                    num++;
                }
            }
        }
    }

    // Este
    if(columna + 1 >= columnas) {
        este = 0;
    } else {
        let limite = false;
        let num = 1;
        while(!limite) {
            if(columna + num >= columnas) {
                este = 0;
                limite = true;
            } else {
                if(grid[fila][columna + num] === '#') {
                    este = 1;
                    limite = true;
                } else if(grid[fila][columna + num] === 'L') {
                    este = 0;
                    limite = true;
                } else {
                    num++;
                }
            }
        }
    }

    // Nor-Este
    if(columna + 1 >= columnas || fila - 1 < 0) {
        norEste = 0;
    } else {
        let limite = false;
        let num = 1;
        while(!limite) {
            if(columna + num >= columnas || fila - num < 0) {
                norEste = 0;
                limite = true;
            } else {
                if(grid[fila - num][columna + num] === '#') {
                    norEste = 1;
                    limite = true;
                } else if(grid[fila - num][columna + num] === 'L') {
                    norEste = 0;
                    limite = true;
                } else {
                    num++;
                }
            }
        }
    }

    // Sur-Este
    if(columna + 1 >= columnas || fila + 1 >= filas) {
        surEste = 0;
    } else {
        let limite = false;
        let num = 1;
        while(!limite) {
            if(columna + num >= columnas || fila + num >= filas) {
                surEste = 0;
                limite = true;
            } else {
                if(grid[fila + num][columna + num] === '#') {
                    surEste = 1;
                    limite = true;
                } else if(grid[fila + num][columna + num] === 'L') {
                    surEste = 0;
                    limite = true;
                } else {
                    num++;
                }
            }

        }
    }

    return oeste + norOeste + surOeste + norte + sur + este + norEste + surEste;
}

solve();
// solve().then(data => console.log('final', data));
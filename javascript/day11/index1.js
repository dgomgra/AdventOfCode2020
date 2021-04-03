/* Setup */
const fs = require('fs').promises;

const readLines = async () => {
    const data = await fs.readFile('./input.txt', {encoding: 'utf-8'});
    return data.split(/\s+/);
    // return data.split('\n');
};

/* Part 1 */
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
               
            } else if(curretChair === '#' && num > 3) {
                gridTemp[i].push('L'); 
                numCambios++;
            } else {
                gridTemp[i].push(curretChair);
            }

        }
    }

    if(numCambios > 0) {
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
        oeste = grid[fila][columna - 1] === '#' ? 1 : 0;
    }

    // Nor-Oeste
    if(columna - 1 < 0 || fila - 1 < 0) {
        norOeste = 0;
    } else {
        norOeste = grid[fila -1][columna -1] === '#' ? 1 : 0;
    }

    // Sur-Oeste
    if(columna - 1 < 0 || fila + 1 >= filas) {
        surOeste = 0;
    } else {
        surOeste = grid[fila + 1][columna - 1] === '#' ? 1 : 0;
    }

    // Norte
    if(fila - 1 < 0) {
        norte = 0;
    } else {
        norte = grid[fila - 1][columna] === '#' ? 1 : 0;
    }

    // Sur
    if(fila + 1 >= filas) {
        sur = 0;
    } else {
        sur = grid[fila + 1][columna] === '#' ? 1 : 0;
    }

    // Este
    if(columna + 1 >= columnas ) {
        este = 0;
    } else {
        este = grid[fila][columna + 1] === '#' ? 1 : 0;
    }

    // Nor-Este
    if(columna + 1 >= columnas || fila - 1 < 0) {
        norEste = 0;
    } else {
        norEste = grid[fila - 1][columna + 1] === '#' ? 1 : 0;
    }

    // Sur-Este
    if(columna + 1 >= columnas || fila + 1 >= filas) {
        surEste = 0;
    } else {
        surEste = grid[fila + 1][columna + 1] === '#' ? 1 : 0;
    }

    return oeste + norOeste + surOeste + norte + sur + este + norEste + surEste;
}

solve();
// solve().then(data => console.log('final', data));
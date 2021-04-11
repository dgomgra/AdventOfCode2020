/* Setup */
const fs = require('fs').promises;
const path = require('path');

/* Part 1 */
const readLines = async () => {
    const input = await fs.readFile(path.join(__dirname, './input.txt'), {encoding:'utf-8'});
    return input.split(/\s+/);
};

const solve = async () => {
    const data = await readLines();
    let datosBus = {
        id: 0,
        marca: 0,
        espera: 0
    };
    const marca = parseInt(data[0]);
    const buses = data[1].split(',').filter((d) => {
        return d !== 'x';
    }).map(Number);

    datosBus.marca = marca * 2;

    for(let bus of buses) {
        let marcaBus = 0;
        while(marcaBus < marca) {
            marcaBus += bus;
        }

        if(datosBus.marca > marcaBus) {
            datosBus.id = bus;
            datosBus.marca = marcaBus;
            datosBus.espera = marcaBus - marca;
        }
    }

    console.log(datosBus);

    return datosBus.id * datosBus.espera;

}

solve().then(console.log);
/* Setup */
const fs = require('fs').promises;
const path = require('path');

const readLines = async () => {
    const data = await fs.readFile(path.join(__dirname, './input.txt'), {encoding: 'utf-8'});
    return data.split(/\s+/);
    ;
};

const cardinals = new Set(['N', 'S', 'W', 'E']);

const solve = async () => {
    const lines = await readLines();
    const commands = lines.map(parseCommand);
    const cardinalCommnands = commands.filter(command => cardinals.has(command.type));
    const rotationCommnands = commands.filter(command => !cardinals.has(command.type));
    const cardinalDistance = calcCardinal(cardinalCommnands);
    const rotationDistance = calcRotation(rotationCommnands);
    const deltaX = Math.abs(cardinalDistance.x + rotationDistance.x);
    const deltaY = Math.abs(cardinalDistance.y + rotationDistance.y);
    return deltaX + deltaY;
}
//          0
//          N
// 270 W         E 90
//          S
//         180


const calcRotation = (commands) => {
    const ship = { x:0, y:0, angle: 90 };
    for(let command of commands) {
        const { type, val} = command;
        if(type === 'L') {
            ship.angle = (360 + ship.angle - val) % 360;
        } else if(type === 'R') {
            ship.angle = (ship.angle + val) % 360;
        } else {
            if(ship.angle === 0) {
                ship.y += val;
            } else if(ship.angle === 180) {
                ship.y -= val;
            } else if(ship.angle === 90) {
                ship.x += val;
            } else if(ship.angle === 270) {
                ship.x -= val;
            }
        }
    }
    return ship;
}

const calcCardinal = (commands) => {
    const ship = { x:0, y:0 };
    for(let command of commands) {
        const { type, val } = command;
        if(type === 'N') {
            ship.y += val;
        } else if(type === 'S') {
                ship.y -= val;
        } else if(type === 'E') {
                ship.x += val;
        } else if(type === 'W') {
                ship.x -= val;
        }
    }
    return ship;
}

const parseCommand = (line) => {
    const type = line[0];
    const val = Number(line.slice(1));
    return { type, val };
};

solve().then(console.log);
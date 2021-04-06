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
    // const cardinalCommnands = commands.filter(command => cardinals.has(command.type));
    // const rotationCommnands = commands.filter(command => !cardinals.has(command.type));
    // const cardinalDistance = calcCardinal(cardinalCommnands);
    // const rotationDistance = calcRotation(rotationCommnands);
    // const deltaX = Math.abs(cardinalDistance.x + rotationDistance.x);
    // const deltaY = Math.abs(cardinalDistance.y + rotationDistance.y);
    const ship =  calcDistance(commands);
    return Math.abs(ship.x) + Math.abs(ship.y);
}
//          0
//          N
// 270 W         E 90
//          S
//         180


const calcDistance = (commands) => {
    const ship = { x:0, y:0 };
    let waypoint = { x:10, y:1 };
    for(let command of commands) {
        const { type, val} = command;
        if(type === 'N') {
            waypoint.y += val;
        } else if(type === 'S') {
            waypoint.y -= val;
        } else if(type === 'E') {
            waypoint.x += val;
        } else if(type === 'W') {
            waypoint.x -= val;
        } else if(type === 'L') {
            const angle = degreeToRadians(val);
            waypoint = rotatePoint(waypoint, angle);
        } else if(type === 'R') {
            const angle = degreeToRadians(val);
            waypoint = rotatePoint(waypoint, -angle);
        } else if(type === 'F') {
            ship.x += waypoint.x * val;
            ship.y += waypoint.y * val;
        }
    }
    return ship;
}

const rotatePoint = (point, angle) => {
    const { x, y } = point;
    const newX = (x * Math.cos(angle)) - (y * Math.sin(angle));
    const newY = (y * Math.cos(angle)) + (x * Math.sin(angle));
    return { x: newX, y: newY }
};

const degreeToRadians = (deg) => deg * (Math.PI / 180);

// const calcCardinal = (commands) => {
//     const ship = { x:0, y:0 };
//     for(let command of commands) {
//         const { type, val } = command;
//         if(type === 'N') {
//             ship.y += val;
//         } else if(type === 'S') {
//                 ship.y -= val;
//         } else if(type === 'E') {
//                 ship.x += val;
//         } else if(type === 'W') {
//                 ship.x -= val;
//         }
//     }
//     return ship;
// }

const parseCommand = (line) => {
    const type = line[0];
    const val = Number(line.slice(1));
    return { type, val };
};

solve().then(console.log);
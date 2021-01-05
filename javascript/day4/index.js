/* Setup */
const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.join(__dirname, './input.txt'), 'utf8');

/* Part 1*/
let listPastport = input.split('\n');
let numPastportOK = 0;
let numPastportKO = 0;

const fsw = require('fs');
var pasaporte = {
    byr: "",
    iyr: "",
    eyr: "",
    hgt:"",
    hcl: "",
    ecl: "",
    pid: "",
    cid: ""
}

let pasa = pasaporte;
for(let pas of listPastport) {
    if(pas === '') {
        valor = evaluaPasaporte2(pasa);
        if(valor) {
            // console.log('Pass ok:', pasa);
            // fsw.appendFileSync('Output.txt', 'Pass ok' + '\n');
            // fsw.appendFileSync('Output.txt', JSON.stringify(pasa) + '\n');
            numPastportOK++;
        } else {
            // console.log('Pass ko:', pasa);
            // fsw.appendFileSync('Output.txt', 'Pass ko' + '\n');
            // fsw.appendFileSync('Output.txt', JSON.stringify(pasa) + '\n');
            numPastportKO++;
        }
        
        pasa.byr = "";
        pasa.pid = "";
        pasa.iyr = "";
        pasa.eyr = "";
        pasa.hgt = "";
        pasa.hcl = "";
        pasa.ecl = "";
        pasa.cid = "";
   } else {
        // fsw.appendFileSync('Output.txt', 'DATOS: ' + pas + '\n');
        // fsw.appendFileSync('Output.txt', pas.indexOf(" ") + '\n');
        if(pas.indexOf(" ") > -1) {
            let datos = pas.split(" ");
            // console.log('DATOS: ', datos);
            for(let d of datos) {
                if(d.indexOf("byr:") > -1) {
                    pasa.byr = d.substring(d.indexOf("byr:") + 4, pas.length);
                }
    
                if(d.indexOf("pid:") > -1) {
                    pasa.pid = d.substring(d.indexOf("pid:") + 4, pas.length);
                }
    
                if(d.indexOf("iyr:") > -1) {
                    pasa.iyr = d.substring(d.indexOf("iyr:") + 4, pas.length);
                }
    
                if(d.indexOf("eyr:") > -1) {
                    pasa.eyr = d.substring(d.indexOf("eyr:") + 4, pas.length);
                }
    
                if(d.indexOf("hgt:") > -1) {
                    pasa.hgt = d.substring(d.indexOf("hgt:") + 4, pas.length);
                }
    
                if(d.indexOf("hcl:") > -1) {
                    pasa.hcl = d.substring(d.indexOf("hcl:") + 4, pas.length);
                }
    
                if(d.indexOf("ecl:") > -1) {
                    pasa.ecl = d.substring(d.indexOf("ecl:") + 4, pas.length);
                }
    
                if(d.indexOf("cid:") > -1) {
                    pasa.cid = d.substring(d.indexOf("cid:") + 4, pas.length);
                }
            }
        } else {
            // fsw.appendFileSync('Output.txt', 'ENTRA: ' + pas + '\n');
            // console.log('ENTRA: ', pas);
            if(pas.indexOf("byr:") > -1) {
                // fsw.appendFileSync('Output.txt', 'BYR: ' +  pas.substring(pas.indexOf("byr:") + 4, pas.length) + '\n');
                pasa.byr = pas.substring(pas.indexOf("byr:") + 4, pas.length);
            }

            if(pas.indexOf("pid:") > -1) {
                pasa.pid = pas.substring(pas.indexOf("pid:") + 4, pas.length);
            }

            if(pas.indexOf("iyr:") > -1) {
                pasa.iyr = pas.substring(pas.indexOf("iyr:") + 4, pas.length);
            }

            if(pas.indexOf("eyr:") > -1) {
                pasa.eyr = pas.substring(pas.indexOf("eyr:") + 4, pas.length);
            }

            if(pas.indexOf("hgt:") > -1) {
                pasa.hgt = pas.substring(pas.indexOf("hgt:") + 4, pas.length);
            }

            if(pas.indexOf("hcl:") > -1) {
                pasa.hcl = pas.substring(pas.indexOf("hcl:") + 4, pas.length);
            }

            if(pas.indexOf("ecl:") > -1) {
                pasa.ecl = pas.substring(pas.indexOf("ecl:") + 4, pas.length);
            }

            if(pas.indexOf("cid:") > -1) {
                pasa.cid = pas.substring(pas.indexOf("cid:") + 4, pas.length
                );
            }
        }
    }
}

function evaluaPasaporte(pass) {
    let hayCid = false;
    let cont = 0;
    if(pass.byr === "") {
        cont++;
    }
    if(pass.iyr === "") {
        cont++;
    }
    if(pass.eyr === "") {
        cont++;
    }
    if(pass.hgt === "") {
        cont++;
    }
    if(pass.hcl === "") {
        cont++;
    }
    if(pass.ecl === "") {
        cont++;
    }
    if(pass.pid === "") {
        cont++;
    }
    console.log('cid: ', pass.cid)
    if(pass.cid === "") {
        cont++;
        hayCid = false;
    } else {
        hayCid = true;
    }

    if(cont === 0) {
        return true;
    } else if(cont === 1 && !hayCid) {
        return true;
    } else {
        return false;
    }
}
console.log('OK: ', numPastportOK);
console.log('KO: ', numPastportKO);


/* Part 2 */
function evaluaPasaporte2(pass) {
    const fsw = require('fs');
    let hayCid = false;
    let byr = false;
    let iyr = false;
    let eyr = false;
    let hgt = false;
    let hcl = false;
    let ecl = false;
    let pid = false;
    let cid = false;

    // Evaluamos el valor de byr
    if(pass.byr !== "") {
        // let expr = /^[0-9]{4}$/;
        if(pass.byr.length === 4) {
            let number = parseInt(pass.byr);
            if(number >= 1920 && number <= 2002) {
                byr = true;
            }
        }
    }

    // Evaluamos el valor de iyr
    if(pass.iyr !== "") {
        if(pass.iyr.length === 4) {
            let number = parseInt(pass.iyr);
            if(number >=2010 && number <= 2020) {
                iyr = true;
            }
        }
    }

    // Evaluamos eyr
    if(pass.eyr !== "") {
        if(pass.eyr.length === 4) {
            let number = parseInt(pass.eyr);
            if(number >=2020 && number <= 2030) {
                eyr = true;
            }
        }
    }

    // Evaluamos hgt
    if(pass.hgt !== "") {
        if(pass.hgt.indexOf("cm") > -1) {
            let datos = pass.hgt.split("cm");
            let num = parseInt(datos[0]);
            if(num >= 150 && num <= 193) {
                hgt = true;
            }
        }

        if(pass.hgt.indexOf("in") > -1) {
            let datos = pass.hgt.split("in");
            let num = parseInt(datos[0]);
            if(num >= 59 && num <= 76) {
                hgt = true;
            }
        }
    }

    // Evaluamos el hcl
    if(pass.hcl !== "") {
        let expr = /^#[0-9a-f]{6}$/;
        if(expr.test(pass.hcl)){
            hcl = true;
        }
    }

    // Evaluamos el ecl
    if(pass.ecl !== "") {
        var mapa = new Map();
        mapa.set('amb', 'amb');
        mapa.set('blu', 'blu');
        mapa.set('brn', 'brn');
        mapa.set('gry', 'gry');
        mapa.set('grn', 'grn');
        mapa.set('hzl', 'hzl');
        mapa.set('oth', 'oth');

        if(mapa.has(pass.ecl)){
            ecl = true;
        }    
    }
    // Evaluamos el pid
    if(pass.pid !== "") {
        let expr = /^[0-9]{9}$/;
        if(expr.test(pass.pid)){
            pid = true;
        }
    }
    // console.log('cid: ', pass.cid)
    // if(pass.cid === "") {
    //     hayCid = false;
    // } else {
    //     hayCid = true;
    // }

    if(byr && iyr && eyr && hgt && hcl && ecl && pid) {
        return true;
    } else {
        fsw.appendFileSync('Output.txt', 'INCORRECTO: ' +  JSON.stringify(pass) + '\n');
        let errores = "";
        if(!byr){
            errores = 'byr:' + pass.byr;
        } else if(!iyr){
            errores = errores + ' - ' + 'iyr:' + pass.iyr;
        } else if(!eyr){
            errores = errores + ' - ' + 'eyr:' + pass.eyr;
        } else if(!hgt){
            errores = errores + ' - ' + 'hgt:' + pass.hgt;
        } else if(!hcl){
            errores = errores + ' - ' + 'hcl:' + pass.hcl;
        } else if(!ecl){
            errores = errores + ' - ' + 'ecl:' + pass.ecl;
        } else if(!pid){
            errores = errores + ' - ' + 'pid:' + pass.pid;
        }
        fsw.appendFileSync('Output.txt', 'ERRORES:'  +  errores + '\n');
        return false;
    }
}
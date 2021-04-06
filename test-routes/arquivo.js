const fs = require('fs');
const os = require("os");


//Print routes
module.exports.printRoutes = () =>{
    const list = getCSVData()
    list.forEach(element => {
        if(element.origem && element.destino){
            console.log(`\n Origin: ${element.origem} \n Destination: ${element.destino}`)
        }
    });
}

//insert routes in  CSV 
module.exports.writerRoute = (oriegem,destino,valor) => {
    fs.appendFileSync('./input-routes.csv',`${oriegem},${destino},${valor}${os.EOL}`);
    fs.close()
}

//read CSV
function getCSVData(){

    const lines = fs.readFileSync('./input-routes.csv').toString().split(os.EOL)
    
    console.log(lines);

    const rotas = []

    for (let index = 1; index < lines.length; index++) {

        const lineData = lines[index].split(',');

        rotas.push(
            {
                origem: lineData[0],
                destino: lineData[1],
                preco: lineData[2],
            }
        )
    }

    return rotas;
}

function getDirect(origem, destino, rotas){
    let direct = null;
    const [match] = rotas.filter(function(rota){
        return rota.origem === origem && rota.destino === destino
    })
    if(match){
        direct = {
            rota: `${match.origem}-${match.destino}`,
            paradas: 0,
            preco: match.preco
        }
    }
    //console.log(direct)
    return direct
}

function getConections(origem, destino, rotas, paradas, rota){

    const origens = rotas.filter(function(rota){
        return rota.origem === origem && rota.destino !== destino
    })

    const [directFlight] = rotas.filter(function(rota){
        return rota.origem === origem && rota.destino === destino
    })

    const possibleRoutes = [];

    possibleRoutes.push({
        rota: `${directFlight.origem}-${directFlight.destino}`,
        paradas: 0,
        preco: directFlight.preco
    })

    for (let index = 0; index < origens.length; index++) {
        const origem = origens[index];
        const direct = getDirect(origem.destino, destino, rotas);

    }

    return possibleRoutes;
    
}

function getBestRoute(origem, destino){
    const rotas = getCSVData();
    const direct = getDirect(origem, destino, rotas)
    const connections = getConections(origem, destino, rotas)
}


(async () => {
      // getCSVData(); //list routes
     //getBestRoute('GRU','SCL'); //best way
     //writerRouterr('CDG','CAR',15) //create route
    //console.log(imprimirRotas())// List routes
})();
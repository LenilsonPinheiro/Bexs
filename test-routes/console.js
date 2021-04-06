const readline = require('readline');
const rotas = require('./arquivo')

const terminal = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

terminal.question('\n Choose an option: \n (1) - List routes \n (2) - Add route \n (3) - exit \n\n >>>',
    resposta => {

        if (resposta === '1') {

            rotas.printRoutes()
            terminal.close()

        } else if (resposta === '2') {

            terminal.question(`\n First Type the ex source: ORG: \n >>>`,
             origem=>{

                terminal.question(` Now ex destination: DET: \n >>>`,
                 destino=>{
                    terminal.question(`Value: >>> \n`,
                      valor=>{
                          //check POSSIBLE ERROR,THE VALUE IS ENTERED
                          try{
                            rotas.writerRoute(`${origem}`,`${destino}`,`${valor}`)
                          }catch(er){
                              console.log('')
                          }
                        
                        terminal.close()
                  })
   
               })

            })

        } else if (resposta === '3') {

            option = 'exit';
            console.log('Leaving...')
            terminal.close()

        } else {

            console.log('Invalid option');
            terminal.close()

        }
    });
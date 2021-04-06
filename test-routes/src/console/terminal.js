
const inquirer = require('inquirer');
const FlightService = require('../Services/FlightService');

(async () => {
  result = await inquirer.prompt([
    {
      name: 'toFrom',
      type: 'input',
      message: 'Enter a route,  example - > ',
      default: 'GRU-CDG',
      validate: (input) => {
        if (input.split('-').length !== 2) {
          return 'invalid route format';
        } else {
          return true;
        }
      },
    },
  ]);

  const [to, from] = result.toFrom.split('-');

  const {bestRoute, price} = FlightService.bestFlight(to, from);

  console.log(`\nMelhor rota: ${bestRoute.join(', ')} > ${price}`);
})();

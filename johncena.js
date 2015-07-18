'use strict';

// npm install readline
// npm install node-babel
// babel-node johncena.js

var readline = require('readline');

var rl = readline.createInterface({ input: process.stdin, output: process.stdout });

var pokemonList = [ 'Bulbasaur', 'Charmander' ];
var caughtPokemon = new Set();

var doCatch = (pokemon) => {
  if (caughtPokemon.has(pokemon)) {
    console.log(`You already have {$pokemon}, what are you trying to pull here.`);
  } else {
    console.log(`YOU CAUGHT {$pokemon.toUpperCase()}`);
    caughtPokemon.add(pokemon);
    if (caughtPokemon.size == pokemonList.length) {
      console.log("⭐️ you caught them all ⭐️");
    }
  }
};

var prompt = () => {
  rl.question("You wake up in a locker room. Around your waist sits the "+
              "United States Championship. You are John Cena, and it's your "+
              "duty as an American and a Hero to Never Give Up. The phone rings. ", (answer) => {
    if (answer == 'quit') {
      rl.close();
    } else if (answer == 'answer phone') {
      // obamaPhone();
      rl.close();
    } else {
      console.log("Only marks think " + answer);
      setTimeout(prompt, 3000);
    }
  });
};

var obamaPhone = () => {
  rl.question("\"Hey is this John Cena I am in a lot of trouble\" says Barack Obama "+
              "\"Can you do me a solid and catch all 151 pokemon\"", (answer) => {
    // todo i gotta go brb
  });
};

prompt();

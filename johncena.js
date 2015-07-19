'use strict';

// npm install readline
// npm install node-babel
// babel-node johncena.js
var readline = require('readline');
var rl = readline.createInterface({ input: process.stdin, output: process.stdout });
var gameOver = false;

//FRIEND CLASS
class Friend {
  constructor(name, type) {
    this.name = name;
    this.type = type;
  }
  capture() {
    console.log('You cannot capture people! It\'s against the law.');
  }
}

//POKEMON SUBCLASS
class Pokemon extends Friend {
  constructor(name, type, level, nature) {
    super(name, type);
    this.level = level;
    this.nature = nature;
  }
  greetPokemon() {
    console.log('I choose you, ' + this.name + '!!!!!');
  }
  capture() {
    caughtPokemon.add(this.name);
    console.log('🌟You caught, ' + this.name + '!!!🌟');
  }
}

//CREATION OF POKES
var stoneCold = new Pokemon('"Stone Cold" Steve Austin', 'Texas', 50, 'Bold');
var bulbasaur = new Pokemon('Bulbasaur', 'grass', 13, 'hardy');
var charmander = new Pokemon('Charmander', 'fire', 8, 'careful');
var theRyback = new Pokemon('The Ryback', 'a big guy', 27, 'adament');

//POKEMON SETS
var allPokemon = new Set();
var caughtPokemon = new Set();

//PUSH POKEMON TO allPokemon
allPokemon.add(stoneCold).add(bulbasaur).add(charmander).add(theRyback);

var doCatch = (pokemonName) => {
  var pokemon = Array.from(allPokemon.values()).find(poke => {
    return poke.name === pokemonName;
  });
  if (!pokemon) {
    console.log("Put that back");
    return false;
  } else if (caughtPokemon.has(pokemonName)) {
    console.log(`You already have ${pokemonName}. There is more work to do, friend.`);
    return false;
  } else {
    pokemon.capture();
    if (caughtPokemon.size == allPokemon.size) {
      console.log("⭐️ you caught them all ⭐️ you get a vacation to yellowstone national park!");
      return true;
    }
  };
};

//DEFAULT ARGUMENTS
var cenaChampCalc = (a, b=12) => {
  return a * b;
};

//VOLTORB BATTLE
var finalBattle = () => {
  //GENERATOR
  function* ominous() {
    var left = 30;
      while (left >= 0) {
      yield left;
      left -= 10;
    }
  }

  var countdown = ominous();

  var check = function() {
    var left = countdown.next().value;
    if (gameOver === true) {
      return;
    }
    console.log(left + " seconds");
    if (left == 0) {
      youLose();
    } else {
      setTimeout(check, 10000);
    }
  }

  //PROMISE
  var voltorbBattle = new Promise(
    function (resolve, reject) {
        check();
        rl.question("US Champion John Cena is at YellowStone National Park. " +
                    "Suddenly, the peaceful atmosphere is destroyed by a " +
                    "D I S T U R B A N C E. A Voltorb appears! " +
                    "\"I'm gonna blow up\" says the Voltorb, \"and I will " +
                    "destroy all the totino's in the aftermath\". US Champion " +
                    "John Cena only has 30 seconds to decide. <AA> the " +
                    "Voltorb, or <nah>? ", (answer) => {
        if(answer === 'AA') {
          resolve();
        } else if(answer === 'nah') {
          reject();
        } else if (answer ==='give up') {
          rl.close();
        } else {
          console.log("Only marks think " + answer);
          reject();
        }
      });
    });

  voltorbBattle.then(function() {
    gameOver = true;
    console.log('CENA WINS LOL. The bears and buffalo of Yellowstone are saved from being blown up '+
                'you saved everyone! America loves you!');
    rl.close();
  }, function() {
    youLose();
  });

  var youLose = () => {
    gameOver = true;
    console.log('The voltorb explodes and fire reigns down upon the land. What was once pristine wilderness '+
                'is now a crater of destruction. You have failed America, and you have failed to catch '+
                'the voltorb. Even worse, math happens: ' + cenaChampCalc(4) + '.');
    rl.close();
  };
};

//TEXT ADVENTURE
var name = '';

var startAdventure = () => {
  rl.question("INSERT NAME: ", (answer) => {
  if (answer === 'John Cena') {
    console.log('Hello, 12 Time WWE Heavyweight Champion John Cena!');
    setTimeout(prompt, 3000);
  } else if (answer != 'John Cena') {
    console.log(`No, it is not ${answer}. It is John Cena.`)
    setTimeout(startAdventure, 3000);
  } else if (answer === 'give up') {
    rl.close();
    }
  });
};

var prompt = () => {
  rl.question("You wake up in a locker room. Around your waist sits the "+
              "United States Championship. You are John Cena, and it is your "+
              "duty as an American and a Hero to Never <give up>. The phone rings, "+
              "will you <answer the phone>?  ", (answer) => {
    if (answer == 'give up') {
      rl.close();
    } else if (answer == 'answer the phone') {
      obamaPhone();
    } else {
      console.log("Only marks think " + answer);
      setTimeout(prompt, 3000);
    }
  });
};

var obamaPhone = () => {
  rl.question("\"Hey is this John Cena? I am in a lot of trouble\" says Barack Obama "+
              "\"Can you do me a solid and catch all 151 pokemon\". You, John Cena, " +
              "Are never one to give up, but you also need to go get some Totino's "+
              "Pizza Rolls(TM). You could either <catch the pokemon>, or "+
              "<get the zza>  ", (answer) => {
    if(answer=='catch the pokemon') {
      iWannaBeTheVeryBestLikeNooneEverWas();
    } else if (answer == 'get the zza') {
      johnCenaGroceryStore();
    } else if (answer=='give up'){
      rl.close();
    } else {
      console.log("Only marks think " + answer);
      setTimeout(obamaPhone, 3000);
    }
  });
};

var iWannaBeTheVeryBestLikeNooneEverWas = () => {
  console.log("You check your 'dex. It contains: <" +
      Array.from(allPokemon.values()).map(poke => poke.name).join('>, <') + '>.');
  rl.question("Who you gonna catch? ", (answer) => {
    if (doCatch(answer)) {
     finalBattle();
    } else {
      iWannaBeTheVeryBestLikeNooneEverWas();
    }
  });
};

var johnCenaGroceryStore = () => {
  console.log("You go to the grocery store. They're sold out of Totino's Pizza Rolls(TM) "+
              "But you're 12 time WWE World Heavyweight Champion, current United States Champion "+
              "John Cena, ");
  rl.question("and the only words you know are <hustle>, <loyalty>, and <respect>.\"", (answer) => {
    if (answer == 'hustle'){
      hustle();
    }
    else if (answer == 'loyalty'){
      loyalty();
    }
    else if (answer == 'respect'){
      respect();
    }
    else if (answer=='give up'){
      rl.close();
    }
    else {
      console.log("Only marks think " + answer);
      setTimeout(johnCenaGroceryStore, 3000);
    }
  });
};

var hustle = () => {
  console.log("Demonstrating the quick thinking of a champion who's not afraid to "+
              "mix it up in the ring and on the mic, you buy some hot pockets and "+
              "prepare to reform them into pizza roll sized bites!");
  rl.close();
};

var loyalty = () => {
  console.log("You've taken your share of knocks, like that time Rude Dude Kevin "+
              "Owens pinned you to the count of three, in the middle of the ring, "+
              "at WWE Elimination Chamber 2015, and it looks like today will be more "+
              "of the same. There are no Totino's Pizza Rolls(TM) and you see no "+
              "option but to go back to the locker room empty-handed. But John Cena "+
              "isn't a quitter and he isn't a coward, and he'll fight another day "+
              "for the belt and for the zza.");
  rl.close();
};

var respect = () => {
  console.log("Just like sometimes U (\C\) ME, sometimes U also crossed C "+
              "see the Totino's Pizza Rolls(TM). But that's OK, because you respect that "+
              "even though the rolls missed you, you'll be back to try again.\n\n"+
              "As you walk out of the store, a dad walks by and notices your swag armband.\n"+
              "Hunter Helmsley Hearst: Wow! United States Champion John Cena! I loved when "+
              "you wrestled all those dudes. Here, take these Totino's Pizza Rolls. I was "+
              "gonna feed my family, but you deserve them!");
  rl.question("I think now is a great time to look at the wildlife at " +
              "<Yellowstone> National Park.", (answer) => {
    if (answer === 'Yellowstone') {
       finalBattle();
    } else if (answer =='give up') {
      rl.close();
    } else {
      console.log("Only marks think " + answer);
      setTimeout(respect, 3000);
    }
  });
};

startAdventure();


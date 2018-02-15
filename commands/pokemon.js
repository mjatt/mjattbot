const pokemonGif = require("pokemon-gif");
var Pokedex = require("pokedex-promise-v2");
var MyPokedex = new Pokedex();

exports.run = (client, message, args) => {
  if (args[0] === "gif") {
    let input = args[1];
    let gif = pokemonGif(input);

    message.channel.send(`${gif}`);
  } else {
    let input = args.join(" ");
    let capInput = input.charAt(0).toUpperCase() + input.slice(1);
    let gif = pokemonGif(input);

    MyPokedex.getPokemonByName(input)
      .then(function(response) {
        console.log(response);
        let id = JSON.stringify(response.id);
        let front = JSON.stringify(response.sprites.front_default);
        
        message.channel.send(
          `**Name:** ${capInput}\n**ID:** ${id}\n${front.replace(/\"/g, "")}\n$`
        );
      })
      .catch(function(error) {
        console.log(error);
      });
  }
};

exports.usage = '+pokemon [pokemonName|gif] [pokemonName]';
exports.helpMessage = 'Returns a pokemon picture and id. Use [gif] to return a gif of the pokemon';

const pokemonGif = require("pokemon-gif");

exports.run = (client, message, args) => {
  let input = args[0];
  try {
    let gif = pokemonGif(input);
    message.channel.send(gif);
  } catch (error) {
    message.channel.send(`I couldn't find that pokemon`);
  }
};

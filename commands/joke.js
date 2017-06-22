var oneLinerJoke = require("one-liner-joke");

exports.run = (client, message, args) => {
  var getRandomJoke = oneLinerJoke.getRandomJoke();
  message.channel.send(getRandomJoke);
};

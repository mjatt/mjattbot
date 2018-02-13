const randomPuppy = require("random-puppy");

exports.run = (client, message, args) => {
  randomPuppy().then(url => {
    message.channel.send(url);
  });
};

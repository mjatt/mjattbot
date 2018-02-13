exports.run = (client, message, args) => {
  var number = args[0];
  if (number === 0) {
    message.channel.send(`Please specify a number to roll up to`);
  }
  var answer = Math.floor(Math.random() * number +1);
  if (isNaN(answer)) {
    message.channel.send(`Stop trying to break me :(`);
  } else {
    message.channel.send(answer);
  }
};
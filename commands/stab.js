exports.run = (client, message, args) => {
  if (args[0] == null) {
    message.channel.send(`You haven't specified anyone to stab!`);
  } else {
    let victim = args.join(" ");
    var number = ["1", "2", "3", "4", "5", "6"];
    var answer = number[Math.floor(Math.random() * number.length)];
    if (answer === "1") {
      message.reply(`stabbed ${victim}, rippo my gyppo`);
    } else if (answer === "2") {
      message.reply(`You messed up and stabbed yourself.`);
    } else if (answer === "3") {
      message.reply(
        `You stabbed ${victim} with a balloon. They stabbed you with a knife.`
      );
    } else if (answer === "4") {
      message.reply(`You stabbed ${victim}, but got caught by the police.`);
    } else if (answer === "5") {
      message.reply(`You stabbed ${victim}'s toe. They're very upset.`);
    } else if (answer === "6") {
      var filter = m => m.content.startsWith(`q`);

      message.reply(`Quick! Press Q to stab ${victim}!`);
      message.channel
        .awaitMessages(filter, { max: 1, time: 2000, errors: ["time"] })
        .then(function(collected) {
          var x = collected.first().author.username;
          message.channel.send(`${x} stabbed ${victim}! Someone save us all!`);
        })
        .catch(collected => message.channel.send(`You missed ${victim}.`));
    }
  }
};

exports.usage = '+stab [content]';
exports.helpMessage = 'Simulates stabbing the content';

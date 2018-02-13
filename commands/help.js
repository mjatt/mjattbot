const glob = require('glob');

exports.run = (client, message, args) => {
  message.reply("Sliding into your DMs fam.");
  var reply = "";
  glob("./commands/*.js", (er, files) => {
    for (var index = 0; index < files.length; index++) {
      var fileName = files[index].replace('./commands/', './');
      const command = require(fileName);
      var usage = command.usage;
      var helpMessage = command.helpMessage;
      if (!usage || !helpMessage)
        continue;
      var commandName = fileName.replace('.js', '').replace('./', '');
      var commandMessage = `**${commandName}**: \`${usage}\` ${helpMessage}`;
      var newLine = (index === (files.length - 1)) ? null : "\n";
      reply += commandMessage + newLine;
    }
    message.author.send(reply)
    .catch(() => {
      message.reply("You might want to enable DM's first :facepalm:");
    });
  });
};

exports.usage = "+8ball [question]";
exports.helpMessage = "Sends you a message with details on other commands you can use.";

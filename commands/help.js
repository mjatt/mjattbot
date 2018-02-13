const glob = require('glob');

exports.run = (client, message, args) => {
  message.reply('Sliding into your DMs fam.');
  var replies = [];
  var replyIndex = 0;
  glob('./commands/*.js', (er, files) => {
    for (var index = 0; index < files.length; index++) {
      var fileName = files[index].replace('./commands/', './');
      const command = require(fileName);
      var usage = command.usage;
      var helpMessage = command.helpMessage;
      if (!usage || !helpMessage)
        continue;
      var commandName = fileName.replace('.js', '').replace('./', '');
      var commandMessage = `**${commandName}**: \`${usage}\` ${helpMessage}`;
      var newLine = (index === (files.length - 1)) ? null : '\n';
      if (replies[replyIndex]) {
        replies[replyIndex] += (commandMessage + newLine);
        if (replies[replyIndex].length > 1000)
          replyIndex++;
      } else 
        replies[replyIndex] = (commandMessage + newLine);
    }
    var promises = [];
    for (var index = 0; index < replies.length; index++ ) {
      var promise = message.author.send(replies[index]);
      promises.push(promise);
    }
    Promise.all(promises)
    .then()
    .catch(() => {
      message.reply('You may want to enable DM\'s first :facepalm:');
    });
  });
};

exports.usage = '+8ball [question]';
exports.helpMessage = 'Sends you a message with details on other commands you can use.';

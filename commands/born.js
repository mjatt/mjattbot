exports.run = (client, message, args) => {
  if(!message.mentions.users.first()) {
  message.reply(`Your account was created at ${message.author.createdAt}`);
  } else {
    message.reply(`${message.mentions.users.first().username}'s account was created at ${message.mentions.users.first().createdAt}`)
  }
};

exports.usage = '+born [@user]';
exports.helpMessage = 'Returns the time and date the user was created. Leave blank to get your own.';

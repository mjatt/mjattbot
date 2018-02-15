exports.run = (client, message, args) => {
  if(!message.mentions.users.first()) {
  message.reply(`Your user id is ${message.author.id}`);
  } else {
    message.reply(`${message.mentions.users.first().username}'s user id is ${message.mentions.users.first().id}`)
  }
};


exports.usage = '+id [@user]';
exports.helpMessage = 'Returns the user id of a user. Leave blank to get your own';

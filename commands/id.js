exports.run = (client, message, args) => {
  if(!message.mentions.users.first()) {
  message.reply(`Your user id is ${message.author.id}`);
  } else {
    message.reply(`${message.mentions.users.first().username}'s user id is ${message.mentions.users.first().id}`)
  }
};

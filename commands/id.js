exports.run = (client, message, args) => {
  message.channel.send(`Your Discord user ID is ${message.author.id}`);
}
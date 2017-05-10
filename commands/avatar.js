exports.run = (client, message, args) => {
  message.reply(message.author.avatarURL);
  console.log(`${message.author.username} got their avatar in ${message.guild}`);
}
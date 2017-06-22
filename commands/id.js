exports.run = (client, message, args) => {
  message.channel.send(`Your Discord user ID is ${message.author.id}`);
  console.log(
    `${message.author.username} got their user id in ${message.guild}`
  );
};

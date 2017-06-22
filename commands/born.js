exports.run = (client, message, args) => {
  message.reply(`Your account was born at ${message.author.createdAt}`);
  console.log(
    `${message.author.username} got their account date in ${message.guild}`
  );
};

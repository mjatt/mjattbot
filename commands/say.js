exports.run = (client, message, args) => {
  if (!message.mentions.users.first()) {
    message.channel.send(args.join(" "));
  } else {
    message.channel.send(`Don't mention users`);
  }
};

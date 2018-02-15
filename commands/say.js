exports.run = (client, message, args) => {
  if (!message.mentions.users.first()) {
    message.channel.send(args.join(" "));
    message.delete();
  } else {
    message.delete();
    message.channel.send(`Don't mention users`);
  }
};

exports.usage = '+say [content]';
exports.helpMessage = 'Makes the bot echo your message';

exports.run = (client, message, args) => {
  message.channel.send("Pong").then(m => {
    m.edit(`Pong **${m.createdTimestamp - message.createdTimestamp}ms**`);
  });
};

exports.usage = '+ping';
exports.helpMessage = 'Shows how long it takes for the bot to reply';

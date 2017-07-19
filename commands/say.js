exports.run = (client, message, args) => {
  message.channel.send(args.join(" ")); //makes the bot say the user's input
};

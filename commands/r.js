exports.run = (client, message, args) => {
  if (message.author.id !== "122088742910558209") {
    message.reply(`You don't have permission to use this command`);
  } else if (!args[0]) {
    message.reply(`Must specify a command to refresh`);
  } else {
    delete require.cache[require.resolve(`./${args[0]}.js`)];
    message.reply(`${args[0]} has been refreshed`);
  }
};

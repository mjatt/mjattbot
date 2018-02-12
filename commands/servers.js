exports.run = (bot, message) => {
  if (message.author.id !== "122088742910558209") {
    message.reply(`You don't have permission to use this.`);
  } else {
    message.channel.send(
      `I'm currently in: \n${bot.guilds.map(g => g.name).join(" \n")}`
    );
  }
};
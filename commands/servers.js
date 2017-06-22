exports.run = (bot, message) => {
  message.channel.send(`I'm currently in: \n${bot.guilds.map(g => g.name).join(" \n")}`);
}
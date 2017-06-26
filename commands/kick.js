const Discord = require(`discord.js`);

exports.run = (clent, message, args) => {
  if (!message.guild.member(client.user).hasPermission("KICK_MEMBERS")) {
    message.reply(`I don't have permission to do that`);
  }
  if (!message.member.hasPermission("KICK_MEMBERS")) {
    message.reply(`Insufficient permissions`);
  } else {
    let kickUser = message.mentions.users.first();
    if (!kickUser) return message.reply(`Specify a user to kick`);
    message.guild.member(kickUser).kick();
    message.reply(`Kicked ${kickUser}`);
  };
}
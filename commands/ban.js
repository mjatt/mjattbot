const Discord = require(`discord.js`);

exports.run = (clent, message, args) => {
  if (!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) {
    message.reply(`I don't have permission to do that`);
  }
  if (!message.member.hasPermission("BAN_MEMBERS")) {
    message.reply(`Insufficient permissions`);
  } else {
    let banUser = message.mentions.users.first();
    if (!banUser) return message.reply(`Specify a user to ban`);
    message.guild.member(banUser).kick();
    message.reply(`Banned ${banUser}`);
  }
};

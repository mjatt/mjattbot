const Discord = require(`discord.js`);

exports.run = (client, message, args) => {
  if (!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) {
    message.reply(`I don't have permission to do that`);
  }
  if (!message.member.hasPermission("BAN_MEMBERS")) {
    message.reply(`Insufficient permissions`);
  } else {
    message.guild
      .unban(args[0])
      .then(user =>
        message.reply(`Unbanned ${user.username} from ${message.guild.name}`)
      )
      .catch(console.error);
  }
};

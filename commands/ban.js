const Discord = require(`discord.js`);

exports.run = (client, message, args) => {
  if (!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) {
    message.reply(`I don't have permission to do that`);
  }
  if (!message.member.hasPermission("BAN_MEMBERS")) {
    message.reply(`Insufficient permissions`);
  } else {
    let banUser = message.mentions.users.first();
    let reason = args.slice(1).join(" ");
    if (!banUser) return message.reply(`Specify a user to ban`);
    banUser.send(
      `You have been banned from ${message.guild} by ${message.author.username}. Reason: ${reason}`
    );
    banUser.send(`http://gph.is/2gdmhIL`);
    message.guild.member(banUser).kick();
    message.reply(`Banned ${banUser}`);
  }
};

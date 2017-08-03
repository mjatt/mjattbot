const Discord = require(`discord.js`);

exports.run = (client, message, args) => {
  if (!message.guild.member(client.user).hasPermission("KICK_MEMBERS")) {
    message.reply(`I don't have permission to do that`);
  }
  if (!message.member.hasPermission("KICK_MEMBERS")) {
    message.reply(`Insufficient permissions`);
  } else {
    let kickUser = message.mentions.users.first();
    let reason = args.slice(1).join(" ");
    if (!kickUser) return message.reply(`Specify a user to kick`);
    kickUser.send(
      `You have been kicked from ${message.guild} by ${message.author.username}. Reason: ${reason}`
    );
    kickUser.send(`http://gph.is/2gdmhIL`);
    message.guild.member(kickUser).kick();
    message.reply(`Kicked ${kickUser}`);
  }
};

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
    try {
      banUser.send(
        `You have been banned from ${message.guild} by ${message.author.username}. Reason: ${reason}`
      );
      banUser.send(`http://gph.is/2gdmhIL`);
    } catch(err) {
      console.log(`Couldn't send DM to ${banUser}`);
    }
    message.guild.member(banUser).ban();
    message.reply(`Banned ${banUser}. Reason: ${reason}`);
  }
};

exports.usage = '+ban [@user][reason]';
exports.helpMessage = 'Bans the selected user and sends a private message showing the reason they were banned.';

exports.run = (client, message, args) => {
  if (!message.guild.member(client.user).hasPermission("KICK_MEMBERS")) {
    return message.reply(`You don't have permission to do that.`);
  }
  if (!message.guild.channels.find("name", `moderation`)) {
    message.guild
      .createChannel("moderation", "text")
      .then(log => {
        setTimeout(() => {
          let everyone = message.guild.id;
          log.overwritePermissions(`${everyone}`, {
            SEND_MESSAGES: false
          });
          log.overwritePermissions(client.user.id, {
            SEND_MESSAGES: true
          });
        }, 5000);
      })
      .catch(e => {
        message.channel.send("There was an error, try again.");
      });
    message.reply(`Channel created as #moderation.`);
  } else {
    message.reply(`That channel already exists.`);
  }
};

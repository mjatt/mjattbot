exports.run = (client, message, args) => {
  message.channel.send(
    `Invite me to your server! https://discordapp.com/oauth2/authorize?client_id=246644444747661312&scope=bot&permissions=0`
  );
  message.channel.send(
    `Join my developer's server https://discord.gg/e2B2nHX`
  );
};

exports.usage = '+invite';
exports.helpMessage = 'Returns the link to invite the bot to a server. Also returns a link to my discord.';

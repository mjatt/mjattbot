exports.run = (client, message, args) => {
  message.channel.send(
    `Invite me to your server! https://discordapp.com/oauth2/authorize?client_id=246644444747661312&scope=bot&permissions=0`
  );
  message.channel.send(
    `Join my developer's server https://discord.gg/e2B2nHX AAA`
  );
  console.log(
    `${message.author.username} got the invite links in ${message.guild}`
  );
};

const Discord = require('discord.js');

exports.run = (client, member) => {
  let guild = member.guild; //gets the server that the member joined
  guild.defaultChannel.send(
    `Welcome to ${member.guild.name}, ${member.user}!`
  ); //sends message to default channel of the server
  console.log(`${member.user} just joined ${member.guild.name}`);
};

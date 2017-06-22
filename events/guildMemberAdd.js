exports.run = (client) => {
  let guild = member.guild; //gets the server that the member joined
  guild.defaultChannel.sendMessage(`Welcome to ${member.guild.name}, ${member.user}!`) //sends message to default channel of the server
  console.log(`${member.user} just joined ${member.guild.name}`);
}
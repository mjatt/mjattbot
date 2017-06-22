exports.run = (client, guild) => {
  client.channels
    .get("193096439872618497")
    .send(`I've been added to ${guild.name}, which has ${guild.memberCount} users`);
  console.log(`I've been added to ${guild.name}`);
  guild.defaultChannel.send(`Hi there, I'm NelsonManBot. :wave: To get started; use +help.`);
};

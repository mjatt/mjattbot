exports.run = (client, guild) => {
  client.channels.get("193096439872618497").send(`I've been removed from ${guild.name}, which had ${guild.memberCount} members`);
  console.log(`cy@ ${guild.name}`);
};

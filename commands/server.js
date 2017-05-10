const discord = require(`discord.js`);

exports.run = (client, message, args) => {
  if(message.guild === null) {
      message.reply('Go in a guild first');
    } else {
  let name = message.guild.id;

    let embed = new discord.RichEmbed();
    var emojis = client.guilds.get(name).emojis.map(e => e).join(": ");
    if(emojis === undefined){
      emojis = "\u200b";
    }
    const now = new Date();
    embed
    .setColor(462224)
    .setAuthor(`${client.guilds.get(name).name}`, client.guilds.get(name).iconURL)
    .setTitle(`${client.guilds.get(name).name}` , "Server Info")
    .setThumbnail(client.guilds.get(name).iconURL)
    .addField(`Server ID`, name, true)
    .addField(`Owner`, `${client.guilds.get(name).owner}`, true)
    .addField(`Region`, `${client.guilds.get(name).region}`, true)
    .addField(`Created On`, `${client.guilds.get(name).createdAt}`, true)
    .addField(`Member Count`, `${client.guilds.get(name).memberCount}`, true)
    .addField(`Channels`, `${client.guilds.get(name).channels.map(c => c.name).join(", ")}`)
    .addField(`Roles`, `${client.guilds.get(name).roles.map(r => r.name).join(", ")}`)
    .setFooter(`Request created at ` + now)
    message.channel.send({embed: embed});
    console.log(`${message.author.username} just viewed ${message.guild}'s stats`);
}
};
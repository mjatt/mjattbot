const Discord = require(`discord.js`);

exports.run = (client, message, args) => {
  const embed = new Discord.RichEmbed();
         const now = new Date();
        embed.setColor(462224)
        .setAuthor(`NelsonManbot`, `${client.user.avatarURL}`)
        .setThumbnail(`${client.user.avatarURL}`)
        .addField(`Info`, `Bot created by Mjatt`, true)
        .addField(`Language`, `Javascript`, true)
        .addField(`Bot Version`, `0.4`, true)
        .addField(`Memory`, `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, true)
        .addField(`Servers`, `${client.guilds.size.toLocaleString()}`, true)
        .addField(`Channels`, `${client.channels.size.toLocaleString()}`, true)
        .addField(`Users`, `${client.users.size.toLocaleString()}`, true)
         .setFooter(`Request generated at ${now}`)
        message.channel.send({embed: embed});
}
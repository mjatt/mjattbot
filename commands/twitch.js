const request = require("request-promise");
var Discord = require("discord.js");
exports.run = (client, message, args) => {
  var options = {
    url: `https://api.twitch.tv/kraken/channels/${args[0]}/`,
    headers: {
      "Client-ID": ""
    },
    json: true
  };

  request(options).then(response => {
    console.log(response);
    const embed = new Discord.RichEmbed();
    let now = new Date();
    embed
      .setColor("PURPLE")
      .setAuthor(response.display_name, response.logo)
      .addField(`Status`, response.status)
      .addField(`Channel`, response.display_name, true)
      .addField(`Playing`, response.game, true)
      .addField(`Followers`, response.followers, true)
      .addField(`URL`, response.url, true);
    message.channel.send({
      embed: embed
    });
  });
};

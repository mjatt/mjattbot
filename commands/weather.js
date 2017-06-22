var weather = require("weather-js");
var Discord = require("discord.js");
var wowow = ":thinking:";

exports.run = (client, message, args) => {
  weather.find({ search: args[0], degreeType: "C" }, function(err, result) {
    if (result[0] !== undefined) {
      if (err) {
        console.log(err);
      } else {
        let location = JSON.stringify(result[0].location.name, null, 2);
        let type = JSON.stringify(result[0].current.skytext, null, 2);
        let temp = JSON.stringify(result[0].current.temperature, null, 2);
        let wind = JSON.stringify(result[0].current.windspeed, null, 2);

        if (type === `"sunny"`) {
          var wowow = ":sunny:";
        } else if ((type = `"partly cloudy"`)) {
          var wowow = ":partly_sunny:";
        } else if ((type = '"rainy"')) {
          var wowow = ":cloud_rain:";
        }

        const embed = new Discord.RichEmbed();
        let now = new Date();
        embed
          .setColor("RANDOM")
          .setAuthor(`NelsonManbot`, `${client.user.avatarURL}`)
          .addField(`Location`, location.replace(/\"/g, ""), true)
          .addField(`Temperature`, `${temp.replace(/\"/g, "")}°C`, true)
          .addField(`Windspeed`, wind.replace(/\"/g, ""), true)
          .addField(`What's it like?`, wowow.replace(/\"/g, ""), true)
          .setFooter(`Request generated at ${now}`);
        message.channel.send({ embed: embed });
      }
    } else {
      message.channel.send(`Couldn't find a place with that name`);
    }
  });
};

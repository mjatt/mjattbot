var weather = require("weather-js");
var Discord = require("discord.js");

exports.run = (client, message, args) => {
  weather.find({ search: args.join(" "), degreeType: "C" }, function(
    err,
    result
  ) {
    try {
      if (result !== undefined) {
        let location = JSON.stringify(result[0].location.name, null, 2);
        let type = JSON.stringify(result[0].current.skytext, null, 2);
        let temp = JSON.stringify(result[0].current.temperature, null, 2);
        let wind = JSON.stringify(result[0].current.windspeed, null, 2);
        let feels = JSON.stringify(result[0].current.feelslike, null, 2);
        let humidity = JSON.stringify(result[0].current.humidity, null, 2);

        const embed = new Discord.RichEmbed();
        let now = new Date();
        embed
          .setColor("RANDOM")
          .setAuthor(`NelsonManbot`, `${client.user.avatarURL}`)
          .addField(`Location`, location.replace(/\"/g, ""), true)
          .addField(`Temperature`, `${temp.replace(/\"/g, "")}°C`, true)
          .addField(`Windspeed`, wind.replace(/\"/g, ""), true)
          .addField(`What's it like?`, type.replace(/\"/g, ""), true)
          .addField("It feels like", `${feels.replace(/\"/g, "")}°C`, true)
          .addField(`Humidity`, humidity.replace(/\"/g, ""), true)
          .setFooter(`Request generated at ${now}`);
        message.channel.send({ embed: embed });
      }
    } catch (err) {
      console.log(err);
      message.channel.send(`Couldn't find a place with the name ${args.join(" ")}`);
    }
  });
};

exports.usage = '+weather [location]';
exports.helpMessage = 'Returns some weather information from the location';

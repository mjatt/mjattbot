const Discord = require("discord.js"),
      bot = new Discord.Client(),
      ytdl = require('ytdl-core'),
      moment = require("moment"),
      streamOptions = { seek: 0, volume: 1 },
      config = require("./config.json"), //contains the prefix and bot token
      fs = require("fs"),
      TOKEN = process.env.TOKEN,
      prefix = ":";
// Load the contents of the `/command/` folder and each file in it.
fs.readdir(`${__dirname}/events/`, (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        let eventFunction = require(`${__dirname}/events/${file}`);
        let eventName = file.split(".")[0];
      bot.on(eventName, (...args) => eventFunction.run(bot, ...args));
    });
});
var xkcd = require("xkcd-api");
var minimist = require("minimist");

exports.run = (client, message, args) => {
  if (args[0] == null) {
    xkcd.latest(function(error, response) {
      if (error) {
        console.error(error);
      } else {
        message.channel.send(`**Title:** ${response.safe_title}`);
        message.channel.send(response.img);
        message.channel.send(
          `**Comic number:** ${response.num}, **Made in:** ${response.year}`
        );
      }
    });
  } else if (args[0] == "random") {
    xkcd.random(function(error, response) {
      if (error) {
        console.error(error);
        message.channel.send(error);
      } else {
        message.channel.send(`**Title:** ${response.safe_title}`);
        message.channel.send(response.img);
        message.channel.send(
          `**Comic number:** ${response.num}, **Made in:** ${response.year}`
        );
      }
    });
  } else {
    let number = args[0];

    xkcd.get(number, function(error, response) {
      if (error) {
        console.error(error);
        message.channel.send(error);
      } else {
        message.channel.send(`**Title:** ${response.safe_title}`);
        message.channel.send(response.img);
        message.channel.send(
          `**Comic number:** ${response.num}, **Made in:** ${response.year}`
        );
      }
    });
  }
};

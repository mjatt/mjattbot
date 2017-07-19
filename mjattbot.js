const Discord = require("discord.js"); //allows discordjs to work
const client = new Discord.Client(); //initiates the bot
const yt = require("ytdl-core"); //allows for youtube integration
const key = require("./config.json"); //contains the prefix and bot token
const firebase = require("firebase");
const fs = require("fs");
var count = 0;
const pokemonGif = require("pokemon-gif");
var poke = setInterval(pokeCatch, 300000);
var pokemon = require("./data/pokemon.json");

var config = {
  apiKey: key.firebasekey,
  authDomain: "mjattbot.firebaseapp.com",
  databaseURL: "https://mjattbot.firebaseio.com",
  projectId: "mjattbot",
  storageBucket: "mjattbot.appspot.com",
  messagingSenderId: "688773779333"
};

firebase.initializeApp(config);

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    let eventFunction = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, (...args) => eventFunction.run(client, ...args));
  });
});

function pokeCatch() {
  var filter = m => m.content.startsWith(`!catch`);
  var entry = pokemon[Math.floor(Math.random() * pokemon.length)];
  try {
    var gif = pokemonGif(entry);
  } catch (err) {
    console.log(`Error, input: ${entry}`);
  }
  if (gif == null) {
    return console.log(`no pokemon lol`);
  } else {
    client.channels
      .get("273493977133481984")
      .send(
        `A wild ${entry} appeared! You have 15 seconds to catch it! ${gif}`
      );
    client.channels
      .get("273493977133481984")
      .awaitMessages(filter, { max: 1, time: 30000, errors: ["time"] })
      .then(collected =>
        client.channels.get("273493977133481984").send(`${collected.first().author.username} Caught ${entry}!`)
      )
      .catch(collected =>
        client.channels.get("273493977133481984").send(`The wild ${entry} fled.`)
      );
  }
}

client.on("message", message => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") {
    message.channel.send(
      "Please try this in a public guild. Error: DM channel"
    );
    return;
  }
  if (!message.content.startsWith(key.prefix)) return;

  let command = message.content.split(" ")[0];
  command = command.slice(key.prefix.length);

  let args = message.content.split(" ").slice(1);

  try {
    let cmd = require(`./commands/${command}.js`);
    cmd.run(client, message, args);
    count++;
    console.log(
      `Message Number: ${count} Command: ${command} Args: ${args.join(" ")} Author: ${message.author.username}`
    );
  } catch (err) {
    console.log(err);
  }
});
client.login(key.token); //the token used to initiate the bot, KEEP SECRET PLS

process.on("unhandledRejection", err => {
  console.error("Unhandled exception: " + err.stack);
});

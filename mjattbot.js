const Discord = require("discord.js"); //allows discordjs to work
const client = new Discord.Client(); //initiates the bot
const yt = require('ytdl-core'); //allows for youtube integration
const key = require("./config.json"); //contains the prefix and bot token
const firebase = require("firebase");
const fs = require("fs");
var count = 0;

var config = {
    apiKey: "AIzaSyASYCAs0rJL8eFaJMnd8h9sOZST_H2-j24",
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

client.on("message", message => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") {
  message.channel.send("Please try this in a public guild. Error: DM channel");
  return;
  };
  if(!message.content.startsWith(key.prefix)) return;

  let command = message.content.split(" ")[0];
  command = command.slice(key.prefix.length);

  let args = message.content.split(" ").slice(1);

  try {
    let cmd = require(`./commands/${command}.js`);
    cmd.run(client, message, args);
    count ++;
    console.log(count);
  } catch (err) {
    console.error(err);
  }
});
client.login(key.token); //the token used to initiate the bot, KEEP SECRET PLS


process.on("unhandledRejection", err => {
  console.error("Unhandled exception: " + err.stack);
});

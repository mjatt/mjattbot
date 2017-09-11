const { Client } = require("discord.js"); //allows discordjs to work. only require Client, because there aren't any other options used in this file
const client = new Client({
  disableEveryone: true /* makes sure that the bot cannot mention everyone */
}); //initiates the bot
const yt = require("ytdl-core"); //allows for youtube integration
const key = require("./config.json"); //contains the prefix and bot token
const firebase = require("firebase");
const fs = require("fs");
var count = 0;
const pokemonGif = require("pokemon-gif");
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
const firebaseRef = firebase.database().ref();

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    let eventFunction = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, (...args) => eventFunction.run(client, ...args));
  });
});

client.on("message", message => {
  if (message.author.bot) return; // ignore bots to avoid infinite loop
  if (message.channel.type === "dm") return message.channel.send("Please try this in a public guild. Error: DM channel"); // cleanup, code looks bit cleaner here imo
  
  if (!message.content.startsWith(key.prefix)) return; // ignore msgs without prefix

  let command = message.content.split(" ")[0];
  command = command.slice(key.prefix.length);
  // console.log(command);

  let args = message.content.split(" ").slice(1);

  try {
    let cmd = require(`./commands/${command}.js`);
    count++;
    console.log(
      `Message Number: ${count} Command: ${command} Args: ${args.join(" ") ? args.join(" ") : "no arguments"} Author: ${message.author.username}`
    );
    cmd.run(client, message, args);
  } catch (err) {
    try {
      let tagcmd = require(`./commands/tag.js`); // require the tag command
      let args = message.content.replace(key.prefix, "").split(" "); // makes sure that in this case, args for the tag command is the message content without the prefix
      // console.log(args);
      tagcmd.run(client, message, args);
    } catch (err) {
      console.error(err);
    }
  }
});
client.login(key.token).then(() => {
  console.info(`Logged in successfully as ${client.user.tag}`);
}).catch(err => console.error("Failed to login: " + err)); /* the token used to initiate the bot, KEEP SECRET PLS 
also added catching error with failing login
*/

process.on("unhandledRejection", err => {
  console.error("Unhandled promise rejection, make sure to catch promise rejections!\n " + err.stack); /* added a reminder
  to not forget to catch promise rejections*/
});

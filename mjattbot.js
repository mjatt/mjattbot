const Discord = require("discord.js"); //allows discordjs to work
const client = new Discord.Client(); //initiates the bot
const yt = require('ytdl-core'); //allows for youtube integration
const key = require("./config.json"); //contains the prefix and bot token
const firebase = require("firebase");
const fs = require("fs");

var config = {
    apiKey: "AIzaSyASYCAs0rJL8eFaJMnd8h9sOZST_H2-j24",
    authDomain: "mjattbot.firebaseapp.com",
    databaseURL: "https://mjattbot.firebaseio.com",
    projectId: "mjattbot",
    storageBucket: "mjattbot.appspot.com",
    messagingSenderId: "688773779333"
  };

  firebase.initializeApp(config);
  
client.on("ready", () => {
  let launch = new Date();
  console.log(`Client launched at ${launch}`); //starts the bot
  // client.user.setGame(`+help | Servers: ${client.guilds.size}`)
});

client.on("guildMemberAdd", member => { //if a new user joins
  let guild = member.guild; //gets the server that the member joined
  guild.defaultChannel.sendMessage(`Welcome to ${member.guild.name} ${member.user}`) //sends message to default channel of the server
  console.log(`${member.user} just joined ${member.guild.name}`);
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
  } catch (err) {
    console.error(err);
  }
});
client.login(key.token); //the token used to initiate the bot, KEEP SECRET PLS


process.on("unhandledRejection", err => {
  console.error("Unhandled exception: " + err.stack);
});

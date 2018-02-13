const Discord = require("discord.js"); //allows discordjs to work
const client = new Discord.Client(); //initiates the bot
const yt = require("ytdl-core"); //allows for youtube integration
const key = require("./config.json"); //contains the prefix and bot token
const firebase = require("firebase");
const fs = require("fs");
var count = 0;

//Use this to set how often people should "level up"
const xpModifier = 100;

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
  if (message.author.bot) return;
  if (message.channel.type === "dm") {
    message.channel.send(
      "Please try this in a public guild. Error: DM channel"
    );
    return;
  }
  firebase
    .database()
    .ref("/levels/servers/" + message.guild.id)
    .once("value")
    .then(function(snapshot) {
      var data = snapshot.val();
      if (data === "true") {
        firebase
          .database()
          .ref("/users/servers/" + message.guild.id + "/" + message.author.id)
          .once("value")
          .then(function(snapshot) {
            var data = snapshot.val();
            if (data) {
              var total = 1 + parseInt(data);
              firebaseRef
                .child("users")
                .child("servers")
                .child(message.guild.id)
                .child(message.author.id)
                .set(total);
              let member = message.member;
              if (total % xpModifier === 0) {
                let level = total / xpModifier;
                message.channel.send(
                  `**${message.author.username}** is now level **${level}**!`
                );
                let existingRole = message.guild.roles.find(
                  "name",
                  `Level ${level.toString()}`
                );
                if (!existingRole) {
                  message.guild
                    .createRole({
                      name: `Level ${level.toString()}`,
                      color: "BLUE"
                    })
                    .then(role => {
                      console.log(`Created role ${role}`);
                      member.addRole(role);
                    });
                } else {
                  member.addRole(existingRole).catch(console.error);
                }
              } else return;
            } else {
              firebaseRef
                .child("users")
                .child("servers")
                .child(message.guild.id)
                .child(message.author.id)
                .set(1);
            }
          });
      }
    });

  if (!message.content.startsWith(key.prefix)) return;

  let command = message.content.split(" ")[0];
  command = command.slice(key.prefix.length);

  let args = message.content.split(" ").slice(1);

  try {
    let level = 0;
    var total = "";
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
client
  .login(key.token)
  .then(() => {
    console.info(`Logged in successfully as ${client.user.tag}`);
  })
  .catch(err => console.error("Failed to login: " + err)); //the token used to initiate the bot, KEEP SECRET PLS

process.on("unhandledRejection", err => {
  console.error("Unhandled exception: " + err.stack);
});

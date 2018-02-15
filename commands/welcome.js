const firebase = require("firebase");
const Discord = require(`discord.js`);

exports.run = (client, message, args) => {
  const firebaseRef = firebase.database().ref();
  if (args[0] === "enable") {
    if (!message.guild.member(client.user).hasPermission("MANAGE_CHANNELS")) {
      message.reply(`I don't have permission to do that`);
    }
    if (!message.guild.member(client.user).hasPermission("MANAGE_CHANNELS")) {
      return message.reply(`You don't have permission to do that.`);
    }
    if (!message.guild.channels.find("name", `welcome`)) {
      message.guild
        .createChannel("welcome", "text")
        .then(log => {
          setTimeout(() => {
            let everyone = message.guild.id;
            log.overwritePermissions(`${everyone}`, {
              SEND_MESSAGES: false
            });
            log.overwritePermissions(client.user.id, {
              SEND_MESSAGES: true
            });
          }, 5000);
        })
        .catch(e => {
          message.channel.send("There was an error, try again.");
        });
      message.reply(`Channel created as #welcome.`);
    } else {
      message.reply(`That channel already exists.`);
    }
  } else {
    var content = args.join(" ");
    firebaseRef
      .child("welcome")
      .child("servers")
      .child(message.guild.id)
      .child("message")
      .set(content);
    message.reply(`I've set the welcome message to: ${content}`);
  }
};

exports.usage = '+welcome [enable|your message]';
exports.helpMessage = 'Use +welcome enable, to create the welcome channel. After the channel is created, use +welcome \'Your message....\' to create the welcome message. There is no default message.';

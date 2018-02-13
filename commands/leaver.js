const firebase = require("firebase");
const Discord = require(`discord.js`);

exports.run = (client, message, args) => {
  if (!message.guild.member(client.user).hasPermission("MANAGE_CHANNELS")) {
    return message.reply(`I don't have permission to do that`);
  }
  if (!message.guild.member(client.user).hasPermission("MANAGE_CHANNELS")) {
    return message.reply(`You don't have permission to do that.`);
  } else {
    const firebaseRef = firebase.database().ref();
    var content = args.join(" ");
    firebaseRef
      .child("leave")
      .child("servers")
      .child(message.guild.id)
      .child("message")
      .set(content);
    message.reply(`I've set the leaving message to: ${content}`);
  }
};

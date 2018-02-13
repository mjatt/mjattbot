const firebase = require("firebase");
const firebaseRef = firebase.database().ref();

exports.run = (client, message, args) => {
  if (
    !message.guild.member(client.user).hasPermission("KICK_MEMBERS") &&
    !message.member.hasPermission("BAN_MEMBERS")
  ) {
    return message.reply(
      `I/You don't have permission to use this. Necessary permission: "Kick Members"`
    );
  }
  if (args[0] === "on") {
    firebaseRef
      .child("levels")
      .child("servers")
      .child(message.guild.id)
      .set("true");
    message.channel.send(
      `I've turned levelling on. To turn it off, use "+levels off"!`
    );
  } else if (args[0] === "off") {
    firebaseRef
      .child("levels")
      .child("servers")
      .child(message.guild.id)
      .set("false");
    message.channel.send(
      `I've turned levelling off. To turn it back on, use "+levels on"!`
    );
  } else if (!args[0]) {
    message.channel.send(`Use "+levels on|off" to enable the levelling!`);
  } else {
    message.channel.send(
      `I didn't quite get that. Are you using the command correctly? "+levels on|off`
    );
  }
};

exports.usage = '+levels [on/off]';
exports.helpMessage = 'Turns the levelling system on or off for a guild. Set to off by default';

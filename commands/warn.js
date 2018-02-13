const firebase = require("firebase");
const Discord = require(`discord.js`);
var moment = require(`moment`);

exports.run = (client, message, args) => {
  const firebaseRef = firebase.database().ref();
  let perms = message.member.hasPermission("KICK_MEMBERS");

  if (!message.mentions.users.first()) {
    return message.channel.send(`Please specify a user to warn.`);
  } else if (perms) {
    let user = message.mentions.users.first();
    let id = message.mentions.users.first().id;
    let mod = message.author.username;
    var oReason = args.slice(1);
    var reason = oReason.join(" ");
    var date = moment().format("YYYYDDMMhmmss");
    if (!reason) {
      reason = "No reason provided";
      firebaseRef
        .child("warns")
        .child("servers")
        .child(message.guild.id)
        .child(date)
        .child(id)
        .set(reason);
      message.reply(`Warned ${user}, reason: ${reason}`);
      warn();
    } else {
      firebaseRef
        .child("warns")
        .child("servers")
        .child(message.guild.id)
        .child(date)
        .child(id)
        .set(reason);
      message.reply(`Warned ${user}, reason: ${reason}`);
      warn();
    }
  } else {
    message.reply(`You don't have permission to use this.`);
  }
  function warn() {
    let log = message.guild.channels.find("name", `moderation`);
    if (!log) {
      message.reply(`You haven't enabled the logs. Use +log.`);
    } else {
      const embed = new Discord.RichEmbed();
      const now = new Date();
      embed
        .setColor("RED")
        .addField(
          `Offender: `,
          `**${message.mentions.users.first().username}#${message.mentions.users.first().discriminator}** (${message.mentions.users.first().id})`
        )
        .addField(`Reason: `, reason)
        .addField(
          `Moderator:`,
          `${message.author.username}#${message.author.discriminator}`
        )
        .setFooter(`Warned at ${now}`);

      log.send({ embed });
    }
  }
};

exports.usage = '+warn [@user] [reason]';
exports.helpMessage = 'Adds a message to #moderation if it exists which warns the user for breaking the rules.';

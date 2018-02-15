exports.run = (client, message, args) => {
  if (!args[0]) {
    message.reply(message.author.avatarURL);
  } else {
    if (!message.mentions.users.first().avatarURL) {
      message.reply(`That user has no avatar.`);
    } else {
      message.reply(message.mentions.users.first().avatarURL);
    }
  }
};

exports.usage = '+avatar [@user]';
exports.helpMessage = 'Returns the users avatar, leave blank to get your own';

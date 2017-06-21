exports.run = (client, message, args) => {
  let can_manage_chans = message.channel.permissionsFor(message.member).hasPermission("MANAGE_MESSAGES")
  if (can_manage_chans) {
    if (isNaN(args[0])) {
      message.channel.send(`That's not a number`);
    } else if (!args[0]) {
      message.channel.send(`No number specified`);
    } else if (args[0] < 1) {
      message.channel.send(`Please choose a number larger than 0`);
    } else if (args[0] > 100) {
      message.channel.send(`Maximum of 100 messages`);
    } else {
    let messagecount = parseInt(args[0]) + 1;
    message.channel.fetchMessages({limit: messagecount})
        .then(messages => message.channel.bulkDelete(messages));
    };
  };
};
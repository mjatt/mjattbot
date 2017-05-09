exports.run = (client, message, args) => {
  let can_manage_chans = message.channel.permissionsFor(message.member).hasPermission("MANAGE_MESSAGES")
  if (can_manage_chans) {
    let messagecount = parseInt(args[0]) + 1;
    message.channel.fetchMessages({limit: messagecount})
        .then(messages => message.channel.bulkDelete(messages));
  }
}
exports.run = (client, message, args) => {
  let can_manage_chans = message.channel.permissionsFor(message.member).hasPermission("BAN_MEMBERS")
    if(!can_manage_chans) {
       message.reply('Insufficient Permissions');
    } else {
      if(message.mentions.users.first === null) {
        message.reply('Unspecified user');
      } else {
        message.channel.send('reason for ban:') .then(() => {
          message.channel.awaitMessages(respone => response.content !== null, {
            max: 1,
            time: 30000,
            errors: ['time'],
          })
          .then((collected) => {
            message.channel.send('${collected.first().content}');
          })
          .catch(() => {
            message.channel.send('No reason specfied');
          })
        })
      }
    }
}
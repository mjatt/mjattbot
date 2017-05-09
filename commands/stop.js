exports.run = (client, message, args) => {
  const voiceChannel = message.member.voiceChannel; //gets the voice channel the user is in
      if(!voiceChannel) {
        return message.reply('You need to join a channel first');
      }
      voiceChannel.leave(); //if theyre in the voicechannel then leaves
      console.log(`${message.author.username} just made me leave ${message.member.voiceChannel}`);
      message.channel.send(`Leaving ${message.member.voiceChannel}`);
}
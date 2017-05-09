exports.run = (client, message, args) => {
  const voiceChannel = message.member.voiceChannel;
      if (!voiceChannel) {
        return message.reply(`You need to join a channel first`);
      }
      console.log(`${message.author.username} just tested audio playback in ${message.member.voiceChannel}`);
      message.channel.send(`Testing playback in ${voiceChannel}`);
      voiceChannel.join()
        .then(connnection => {
          let stream = yt("https://www.youtube.com/watch?v=lk0-yDyLqSE", {audioonly: true}); //plays a default video to test connections
          const dispatcher = connnection.playStream(stream);
          dispatcher.on('end', () => {
            voiceChannel.leave();
          });
        });
}
exports.run = (client, message, args) => {
  const url = args.join(" ");
  const voiceChannel = message.member.voiceChannel;
  if (!args[0]) return message.reply(`Please specify a link to play`);
  if (!voiceChannel) {
    return message.reply(`You must be in a voice channel first`);
  }
  voiceChannel.join().then(connnection => {
    dispatcher = message.guild.voiceConnection.playStream(
      yt(url, {
        audioonly: true
      }),
      {
        passes: 1
      }
    );
    yt.getInfo(url, function(err, info) {
      message.channel.send("Playing **" + info.title + "**");
    });
    let collector = message.channel.createCollector(m => m);
    collector.on("collect", c => {
      if (c.content.startsWith("+pause")) {
        message.channel.sendMessage("Song paused").then(() => {
          dispatcher.pause();
        });
      } else if (c.content.startsWith("+resume")) {
        message.channel.sendMessage("Song resumed").then(() => {
          dispatcher.resume();
        });
      } else if (c.content.startsWith("+stop")) {
        message.channel.sendMessage("Stopped").then(() => {
          dispatcher.end();
        });
      }
    });
    dispatcher.on("end", () => {
      collector.stop();
      voiceChannel.leave();
    });
    dispatcher.on("error", err => {
      return message.channel.sendMessage("Error: " + err).then(() => {
        collector.stop();
        voiceChannel.leave();
      });
    });
  });
};

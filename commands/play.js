exports.run = (client, message, args) => {
  const url = args.join(" ");
  const yt = require(`ytdl-core`);
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
      message.channel.send(
        `Playing **${info.title}**! Use: .pause .resume and .stop to control playback.`
      );
    });
    let collector = message.channel.createCollector(m => m);
    collector.on("collect", c => {
      if (c.content.startsWith(".pause")) {
        message.channel.send("Song paused").then(() => {
          dispatcher.pause();
        });
      } else if (c.content.startsWith(".resume")) {
        message.channel.send("Song resumed").then(() => {
          dispatcher.resume();
        });
      } else if (c.content.startsWith(".stop")) {
        message.channel.send("Stopped").then(() => {
          dispatcher.end();
        });
      }
    });
    dispatcher.on("end", () => {
      collector.stop();
      voiceChannel.leave();
    });
    dispatcher.on("error", err => {
      return message.channel.send("Error: " + err).then(() => {
        collector.stop();
        voiceChannel.leave();
      });
    });
  });
};

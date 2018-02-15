var validator = require('youtube-validator')

exports.run = (client, message, args) => {
  const url = args[0];
  const yt = require(`ytdl-core`);
  const voiceChannel = message.member.voiceChannel;
  if (!args[0]) return message.reply(`Please specify a link to play`);
  if (!voiceChannel) {
    return message.reply(`You must be in a voice channel first`);
  }

  if (url.charAt(4) === "s") {
    var https = url.substring(8);
  } else {
    var http = url.substring(7);
  }
  if (!https) {
    validator.validateUrl(http, function (res, err) {
      if (err) {
        console.log(err);
        message.channel.send(`Error! Are you sure you've used a valid YouTube URL?`);
      } else {
        hello();
      }
    })
  } else {
    validator.validateUrl(https, function (res, err) {
      if (err) {
        console.log(err);
        message.channel.send(`Error! Are you sure you've used a valid YouTube URL?`);
      } else {
        hello();
      }
    })
  }

  function hello() {
    voiceChannel.join().then(connnection => {
      dispatcher = message.guild.voiceConnection.playStream(
        yt(url, {
          audioonly: true
        }),
        {
          passes: 1
        }
      );
      yt.getInfo(url, function (err, info) {
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
          message.channel.send(`Stopped playback in ${voiceChannel}`).then(() => {
            // dispatcher.end();
            voiceChannel.leave();
          });
        }
      });
      dispatcher.on("end", () => {
        collector.stop();
        voiceChannel.leave();
      });
      dispatcher.on("error", err => {
        voiceChannel.leave();
        return message.channel.send("Error: " + err).then(() => {
          collector.stop();
        });
      });
    });
  }
};

exports.usage = '+play [youtubeURL]';
exports.helpMessage = 'Plays a YouTube video. This also sends a message with the playback controls. youtu.be links dont work';

exports.run = (client, message, args) => {
  let args = message.content.split(" ").slice(1); //gets the url of the video
  let video = args[0]; //stores the url as the video
  const voiceChannel = message.member.voiceChannel; //gets the users voice channel
  if (!voiceChannel) {
    //if theyre not in a voice channel
    return message.reply(`Join a voice channel you speng`); //aborts the command
  }
  console.log(`${message.author.username} just made me play ${video}`);
  message.channel.send(`Now playing in ${voiceChannel}`);
  voiceChannel
    .join() //joins the channel
    .then(connnection => {
      let stream = yt(video, { audioonly: true }); //streams the audio through the voice channel
      const dispatcher = client.voiceConnections
        .get("181839332313792518")
        .playStream(stream);
      dispatcher.on("end", () => {
        //when the video ends
        voiceChannel.leave(); //leaves the voice channel
      });
    });
};

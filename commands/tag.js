exports.run = (client, message, args) => {
  let args = message.content.split(" ").slice(1);
  let tag = args[0];
  const voiceChannel = message.member.voiceChannel;
  var video = firebaseRef.child('Tags');
  var final = video.toString();
  
  const firebaseRef = firebase.database().ref();
  const firebaseUserRef = firebase.database.ref().child("Users");

  if(!voiceChannel) {
    message.reply(`You must be in a voice channel first`);
  };
  voiceChannel.join()
    .then(connection => {
      let stream = yt(final, {audioonly:true});
      const dispatcher = connection.playStream(stream);
      dispatcher.on{'end', () => {
        voiceChannel.leave();
    }};
  });
};

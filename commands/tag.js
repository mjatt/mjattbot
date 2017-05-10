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
    console.log(`${message.author.username} just tried to trigger a tag but failed in ${message.guild}`);
  };
  console.log(`${message.author.username} just triggered the tag: ${tag} in ${message.guild}`);
  voiceChannel.join()
    .then(connection => {
      let stream = yt(final, {audioonly:true});
      const dispatcher = connection.playStream(stream);
      dispatcher.on{'end', () => {
        voiceChannel.leave();
    }};
  });
};

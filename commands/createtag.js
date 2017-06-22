exports.run = (client, message, args) => {
  let args = message.content.split(" ").slice(1);
  let tag = args[0];
  let video = args[1];
  firebaseRef.child("Tags").child(tag).set(video);
  message.channel.send(`Tag created as ${tag}`);
  console.log(
    `${message.author.username} made the tag ${tag} ${video} in ${message.guild}`
  );
};

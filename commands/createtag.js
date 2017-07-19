const firebase = require("firebase");

exports.run = (client, message, args) => {
  let tag = args[0];
  let video = args[1];
  firebaseRef.child("Tags").child(tag).set(video);
  message.channel.send(`Tag created as ${tag}`);
};

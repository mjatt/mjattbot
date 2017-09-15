const firebase = require("firebase");
const firebaseRef = firebase.database().ref();
exports.run = (client, guild) => {
  client.channels
    .get("193096439872618497")
    .send(
      `I've been added to ${guild.name}, which has ${guild.memberCount} users`
    );
  console.log(`I've been added to ${guild.name}`);
  firebaseRef
    .child("levels")
    .child("servers")
    .child(message.guild.id)
    .set("false");
};

const firebase = require("firebase");

const firebaseRef = firebase.database().ref();
const firebaseUserRef = firebase.database().ref().child("Users");

exports.run = (client, message, args) => {
  let tag = args[0];
  var original = args.slice(1);
  var content = original.join(" ");
  if (content == null) {
    message.channel.send(`You didn't create any content for your tag!`);
  } else if (tag == null) {
    message.channel.send(`You didn't name your tag!`);
  } else {
    firebaseRef
      .child("Tags")
      .child("servers")
      .child(message.guild.id)
      .child(tag)
      .set(content);
    message.reply(`Created tag: ${tag} as ${content}`);
  }
};
